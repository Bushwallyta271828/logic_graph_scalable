'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';
import { Claim, ClaimWithDefinitions } from '@/app/_types/claim-types';
import { parseFormula } from '@/app/_contexts/parse-formula';
import { immediateConstraintDependencies } from '@/app/_contexts/immediate-constraint-dependencies';
import { displayConstraintParse } from '@/app/_contexts/display-constraint-parse';

type ClaimsContext = {
  claimLookup: { [claimID: string]: Claim };
  claimIDs: string[]; //used for storing the order in which the claims are displayed
  setClaimLookup: React.Dispatch<React.SetStateAction<{ [claimID: string]: Claim }>>;
  setClaimIDs: React.Dispatch<React.SetStateAction<string[]>>;
  
  newClaimID: () => string;
  
  addClaim: (claim: Claim) => void;
  moveClaim: ({startClaimID, endClaimID}: {startClaimID: string, endClaimID: string}) => void;
  attachBlankDefinition: (claim: ClaimWithDefinitions) => void;
  editDefinitionClaimID: ({claim, oldDefinitionClaimID, newDefinitionClaimID}: {claim: ClaimWithDefinitions, oldDefinitionClaimID: string, newDefinitionClaimID: string}) => void;
  moveDefinition: ({claim, startDefinitionClaimID, endDefinitionClaimID}: {claim: ClaimWithDefinitions, startDefinitionClaimID: string, endDefinitionClaimID: string}) => void;

  setClaimText: ({claimID, newText}: {claimID: string, newText: string}) => void;
  getInterpretedText: (claim: Claim) => string;
  getDisplayData: (claim: Claim) => {displayText: string, validText: boolean};

  //getDependencies: (claim: Claim) => Set<string>;
  //deleteClaim: (claim: Claim) => void;
}

//A valid claimID must be non-empty, alphanumeric, and not one of the following:
const forbiddenClaimIDs = new Set(['implies', 'or', 'and', 'not']);

export const ClaimsContext = createContext<ClaimsContext | null>(null);

export function ClaimsContextProvider({ children }: { children: React.ReactNode }) {
  const [claimLookup, setClaimLookup] = useState<{ [claimID: string]: Claim }>({});
  const [claimIDs, setClaimIDs] = useState<string[]>([]);


  const newClaimID = () => {
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
      (claimLookup.hasOwnProperty(uniqueID) || forbiddenClaimIDs.has(uniqueID))
      && (attempts < 100)
    );
    if (claimLookup.hasOwnProperty(uniqueID) || forbiddenClaimIDs.has(uniqueID)) {
      throw new Error("Unable to generate new claimID");
    }
    return uniqueID;
  };


  const addClaim = (claim: Claim) => {
    const claimID = claim.claimID;
    if (claimLookup.hasOwnProperty(claimID) || forbiddenClaimIDs.has(claimID)) {
      throw new Error("Invalid or already-in-use claimID");
    }
    setClaimLookup(prevLookup => ({ ...prevLookup, [claimID]: claim }));
    setClaimIDs(prevIDs => [claimID,].concat(prevIDs));
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
    const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };
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
    const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };
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
    const parse = parseFormula({formula: claim.text});
    if (parse === null) {return {displayText: "Please enter a valid constraint.", validText: false};}
    const referencedIDs = Array.from(immediateConstraintDependencies({parse: parse}));
    console.log(referencedIDs);
    console.log(parse);
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
    const displayText = displayConstraintParse({parse: parse, substitutions: substitutions});
    return {displayText: displayText, validText: true};
  }


  return (
    <ClaimsContext.Provider
      value={{
        claimLookup,
        claimIDs,
        setClaimLookup,
        setClaimIDs,

        newClaimID,

        addClaim,
        moveClaim,
        attachBlankDefinition,
        editDefinitionClaimID,
        moveDefinition,

        setClaimText,
        getInterpretedText,
        getDisplayData,
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
