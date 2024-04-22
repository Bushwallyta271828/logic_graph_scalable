'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';
import { Claim, ClaimWithDefinitions, potentialClaimID } from '@/app/_types/claim-types';
import { parseFormula } from '@/app/_contexts/parse-formula';
import { immediateConstraintDependencies } from '@/app/_contexts/immediate-constraint-dependencies';
import { displayConstraintParse } from '@/app/_contexts/display-constraint-parse';

type ClaimsContext = {
  claimLookup: { [claimID: string]: Claim };
  claimIDs: string[]; //used for storing the order in which the claims are displayed
  //I don't return the setClaimLookup or setClaimIDs functions so that
  //other parts of the code can't break the data invariants.
  
  addClaim: ({author, claimType, text, conditioning}: {author: string, claimType: 'text'|'definition'|'zeroth-order', text: string, conditioning: boolean | null}) => string;
  //addClaim returns the claimID assigned to the new claim.
  //To add a claim with definitions, first add the claim without definitions and then
  //add the definitions individually by creating blank definitions and then editing them.
  //This way, definitionClaimIDs[] cannot get duplicates by accident.
  moveClaim: ({startClaimID, endClaimID}: {startClaimID: string, endClaimID: string}) => void;
  attachBlankDefinition: (claim: ClaimWithDefinitions) => void;
  editDefinitionClaimID: ({claim, oldDefinitionClaimID, newDefinitionClaimID}: {claim: ClaimWithDefinitions, oldDefinitionClaimID: string, newDefinitionClaimID: string}) => void;
  moveDefinition: ({claim, startDefinitionClaimID, endDefinitionClaimID}: {claim: ClaimWithDefinitions, startDefinitionClaimID: string, endDefinitionClaimID: string}) => void;

  setClaimText: ({claimID, newText}: {claimID: string, newText: string}) => void;
  getInterpretedText: (claim: Claim) => string;
  getDisplayData: (claim: Claim) => {displayText: string, validText: boolean};

  getAncestors: (claim: Claim) => Set<string>;
  deleteClaim: (claim: Claim) => void;
}

export const ClaimsContext = createContext<ClaimsContext | null>(null);

export function ClaimsContextProvider({ children }: { children: React.ReactNode }) {
  const [claimLookup, setClaimLookup] = useState<{ [claimID: string]: Claim }>({});
  const [claimIDs, setClaimIDs] = useState<string[]>([]);


  const newClaimID = () => {
    //Helper function for addClaim
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let uniqueID;
    let attempts = 0;
    do {
      uniqueID = '';
      for (let i = 0; i < 3; i++) {
        uniqueID += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      attempts += 1;
    } while (
      (claimLookup.hasOwnProperty(uniqueID) || !potentialClaimID({candidate: uniqueID}))
      && (attempts < 100)
    );
    if (claimLookup.hasOwnProperty(uniqueID) || !potentialClaimID({candidate: uniqueID})) {
      throw new Error("Unable to generate new claimID");
    }
    return uniqueID;
  };

  const addClaim = ({author, claimType, text, conditioning}:
    {author: string, claimType: 'text'|'definition'|'zeroth-order', text: string, conditioning: boolean | null}) => {
    const claimID = newClaimID();
    if (claimType === 'text' || claimType === 'definition') {
      const claim = {
        claimID: claimID,
        author: author,
        claimType: claimType,
        text: text,
        conditioning: conditioning,
        dependencies: new Set<string>(),
        definitionClaimIDs: [] as string[],
      } as Claim;
      setClaimLookup(prevLookup => ({ ...prevLookup, [claimID]: claim }));
      setClaimIDs(prevIDs => [claimID,].concat(prevIDs));
    } else if (claimType === 'zeroth-order') {
      const parse = parseFormula({formula: text});
      const claim = {
        claimID: claimID,
        author: author,
        claimType: claimType,
        text: text,
        conditioning: conditioning,
        dependencies:
          (parse !== null) ?
          immediateConstraintDependencies({parse: parse}) :
          new Set<string>(),
        parse: parse,
      } as Claim;
      setClaimLookup(prevLookup => ({ ...prevLookup, [claimID]: claim }));
      setClaimIDs(prevIDs => [claimID,].concat(prevIDs));
    } else {const exhaustive: never = claimType;}
    return claimID;
  };

  const moveClaim = ({startClaimID, endClaimID}:
    {startClaimID: string, endClaimID: string}) => {
    if (startClaimID === endClaimID) { return; }
    setClaimIDs(prevClaimIDs => {
      const startIndex = prevClaimIDs.indexOf(startClaimID);
      if (startIndex < 0) {throw new Error("Moving unrecognized claim");}
      const endIndex = prevClaimIDs.indexOf(endClaimID);
      let newClaimIDs = [...prevClaimIDs];
      const [removed] = newClaimIDs.splice(startIndex, 1);
      newClaimIDs.splice(endIndex, 0, removed);
      return newClaimIDs;
    });
  };

  const attachBlankDefinition = (claim: ClaimWithDefinitions) => {
    const newDefinitionClaimIDs = ['',].concat(claim.definitionClaimIDs);
    const updatedClaim = {
      ...claim,
      definitionClaimIDs: newDefinitionClaimIDs,
      dependencies: new Set(newDefinitionClaimIDs),
    };
    setClaimLookup(prevClaimLookup => {return { ...prevClaimLookup, [claim.claimID]: updatedClaim };});
  };
  
  const editDefinitionClaimID = ({claim, oldDefinitionClaimID, newDefinitionClaimID}:
    {claim: ClaimWithDefinitions, oldDefinitionClaimID: string, newDefinitionClaimID: string}) => {
    const index = claim.definitionClaimIDs.indexOf(oldDefinitionClaimID);
    if (index < 0) {throw new Error("Editing unrecognized definition attachment");}
    
    let deleteAttachment = (newDefinitionClaimID === "");
    claim.definitionClaimIDs.forEach((oldDefinitionClaimID, oldIndex) => {
      if (newDefinitionClaimID === oldDefinitionClaimID && index !== oldIndex) {
        deleteAttachment = true;
      }
    });
 
    let newDefinitionClaimIDs = [ ...claim.definitionClaimIDs ];
    if (deleteAttachment) {newDefinitionClaimIDs.splice(index, 1);}
    else {newDefinitionClaimIDs[index] = newDefinitionClaimID;}
    const updatedClaim = {
      ...claim,
      definitionClaimIDs: newDefinitionClaimIDs,
      dependencies: new Set(newDefinitionClaimIDs),
    };
    setClaimLookup(prevClaimLookup => {return { ...prevClaimLookup, [claim.claimID]: updatedClaim };});
  };

  const moveDefinition = ({claim, startDefinitionClaimID, endDefinitionClaimID}:
    {claim: ClaimWithDefinitions, startDefinitionClaimID: string, endDefinitionClaimID: string}) => {
    if (startDefinitionClaimID === endDefinitionClaimID) { return; }
    setClaimLookup(prevClaimLookup => {
      const startIndex = claim.definitionClaimIDs.indexOf(startDefinitionClaimID);
      if (startIndex < 0) {throw new Error("Moving unrecognized definition attachment");}
      const endIndex = claim.definitionClaimIDs.indexOf(endDefinitionClaimID);

      let newDefinitionClaimIDs = [ ...claim.definitionClaimIDs ];
      const [removed] = newDefinitionClaimIDs.splice(startIndex, 1);
      newDefinitionClaimIDs.splice(endIndex, 0, removed);
      const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };
      return { ...prevClaimLookup, [claim.claimID]: updatedClaim };
    });
  };


  const setClaimText = ({claimID, newText}: {claimID: string, newText: string}) => {
    setClaimLookup(prevClaimLookup => {
      if (!(claimID in prevClaimLookup))
        {throw new Error("Editing unrecognized claim");}
      const updatedClaim = { ...prevClaimLookup[claimID], text: newText};
      if (updatedClaim.claimType === 'zeroth-order') {
        updatedClaim.parse = parseFormula({formula: newText});
        updatedClaim.dependencies = 
          (updatedClaim.parse !== null) ?
          immediateConstraintDependencies({parse: updatedClaim.parse}) :
          new Set<string>();
      }
      return { ...prevClaimLookup, [claimID]: updatedClaim };
    });
  }

  const getInterpretedText = (claim: Claim) => {
    switch (claim.claimType) {
      case 'text':
        return claim.text;
      case 'definition':
        return `\"${claim.text}\" is a valid definition.`;
      case 'zeroth-order':
        return claim.text;
      default:
        throw new Error('Unrecognized claimType');
    }
  }

  const getDisplayData = (claim: Claim) => {
    if (claim.claimType !== 'zeroth-order')
      {return {displayText: getInterpretedText(claim), validText: true};}
    if (claim.parse === null)
      {return {displayText: "Please enter a valid constraint.", validText: false};}
    const referencedIDs = Array.from(claim.dependencies);
    let substitutions: { [claimID: string]: string} = {};
    for (let i = 0; i < referencedIDs.length; i++) {
      if (!(referencedIDs[i] in claimLookup)) {
        return {
          displayText: "This constraint seems to be referencing an unrecognized claim ID.",
          validText: false,
        };
      }
      substitutions[referencedIDs[i]] = getInterpretedText(claimLookup[referencedIDs[i]]);
    }
    const displayText = displayConstraintParse({parse: claim.parse, substitutions: substitutions});
    return {displayText: displayText, validText: true};
  }


  const getAncestors = (claim: Claim) => {
    //Returns a set containing all the claim IDs of claims
    //that reference this claim, including this claim itself.
    const ancestors = new Set<string>([claim.claimID]);
    let newAncestors = new Set<string>([claim.claimID]);
    
    while (newAncestors.size > 0) {
      const newerAncestors = new Set<string>();
      newAncestors.forEach((ancestor) => {
        for (const claimID in claimLookup) {
          if (claimLookup[claimID].dependencies.has(ancestor)) {
            if (!ancestors.has(claimID)) {
              ancestors.add(claimID);
              newerAncestors.add(claimID);
            }
          }
        }
      });
      newAncestors = newerAncestors;
    }
    return ancestors;
  }

  const deleteClaim = (claim: Claim) => {
    const ancestors = getAncestors(claim);
    setClaimLookup(prevLookup => {
      return Object.entries(prevLookup).reduce((newLookup, [prevClaimID, prevClaim]) => {
        if (!ancestors.has(prevClaimID)) {
          newLookup[prevClaimID] = prevClaim;
        }
        return newLookup;
      }, {} as { [claimID: string]: Claim });
    });
    setClaimIDs(prevClaimIDs => prevClaimIDs.filter(
      (prevClaimID) => !ancestors.has(prevClaimID)));
  }


  return (
    <ClaimsContext.Provider
      value={{
        claimLookup,
        claimIDs,

        addClaim,
        moveClaim,
        attachBlankDefinition,
        editDefinitionClaimID,
        moveDefinition,

        setClaimText,
        getInterpretedText,
        getDisplayData,

        getAncestors,
        deleteClaim,
        }}>
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaimsContext() {
  const context = useContext(ClaimsContext);
  if (context === null) {
    throw new Error("useClaimsContext must be used within a ClaimsContextProvider!");
  }
  return context;
}
