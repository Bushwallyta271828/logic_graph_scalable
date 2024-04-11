'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';
import { Claim, ClaimWithDefinitions } from '@/app/_types/claim-types';

type ClaimsContext = {
  claimLookup: { [claimID: string]: Claim };
  claimIDs: string[]; //used for storing the order in which the claims are displayed
  setClaimLookup: React.Dispatch<React.SetStateAction<{ [claimID: string]: Claim }>>;
  setClaimIDs: React.Dispatch<React.SetStateAction<string[]>>;
  newClaimID: () => string;
  addClaim: (claim: Claim) => void;
  moveClaim: ({startIndex, endIndex}: {startIndex: number, endIndex: number}) => void;
  attachBlankDefinition: (claim: ClaimWithDefinitions) => void;
  editDefinitionClaimID: ({claim, index, newDefinitionClaimID}: {claim: ClaimWithDefinitions, index: number, newDefinitionClaimID: string}) => void;
  moveDefinition: ({claim, startIndex, endIndex}: {claim: ClaimWithDefinitions, startIndex: number, endIndex: number}) => void;
}

export const ClaimsContext = createContext<ClaimsContext | null>(null);

export function ClaimsContextProvider({ children }: { children: React.ReactNode }) {
  const [claimLookup, setClaimLookup] = useState<{ [claimID: string]: Claim }>({});
  const [claimIDs, setClaimIDs] = useState<string[]>([]);

  const newClaimID = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID;
    let attempts = 0;
    do {
      uniqueID = '';
      for (let i = 0; i < 6; i++) {
        uniqueID += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      attempts += 1;
    } while (claimLookup.hasOwnProperty(uniqueID) && attempts < 100);
    if (claimLookup.hasOwnProperty(uniqueID)) {
      throw new Error("Unable to generate new claimID");
    }
    return uniqueID;
  };

  const addClaim = (claim: Claim) => {
    const claimID = claim.claimID;
    setClaimLookup(prevLookup => ({ ...prevLookup, [claimID]: claim }));
    setClaimIDs(prevIDs => [claimID,].concat(prevIDs));
  };

  const moveClaim = ({startIndex, endIndex}:
    {startIndex: number, endIndex: number}) => {
    if (startIndex === endIndex) { return; }
    setClaimIDs(prevClaimIDs => {
      let newClaimIDs = [...prevClaimIDs];
      const [removed] = newClaimIDs.splice(startIndex, 1);
      newClaimIDs.splice(endIndex, 0, removed);
      return newClaimIDs;
    });
  };


  const attachBlankDefinition = (claim: ClaimWithDefinitions) => {
    const newDefinitionClaimIDs = ['',].concat(claim.definitionClaimIDs);
    const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };
    setClaimLookup(prevClaimLookup => { ...prevClaimLookup, [claim.claimID]: updatedClaim });
  };
  
  const editDefinitionClaimID = ({claim, index, newDefinitionClaimID}:
    {claim: ClaimWithDefinitions, index: number, newDefinitionClaimID: string}) => {
    let newDefinitionClaimIDs = [ ...claim.definitionClaimIDs ];
    if (index < 0 || index >= newDefinitionClaimIDs.length) {throw new Error("Index out of bounds");}
    if (newStr === "") {newDefinitionClaimIDs.splice(index, 1);}
      else {newDefinitionClaimIDs[index] = newDefinitionClaimID;}
    const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };
    setClaimLookup(prevClaimLookup => { ...prevClaimLookup, [claim.claimID]: updatedClaim });
  };

  const moveDefinition = ({claim, startIndex, endIndex}:
    {claim: ClaimWithDefinitions, startIndex: number, endIndex: number}) => {
    if (startIndex === endIndex) { return; }
    setClaimLookup(prevClaimLookup => {
      let newDefinitionClaimIDs = [ ...claim.definitionClaimIDs ];
      const [removed] = newDefinitionClaimIDs.splice(startIndex, 1);
      newDefinitionClaimIDs.splice(endIndex, 0, removed);
      const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };
      return { ...prevClaimLookup, [claim.claimID]: updatedClaim };
    });
  };

  return (
    <ClaimsContext.Provider
      value={{claimLookup, claimIDs, setClaimLookup, setClaimIDs, newClaimID, addClaim, moveClaim, moveDefinition}}>
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaimsContext() {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error("useClaimsContext must be used within a ClaimsContextProvider!");
  }
  return context;
}
