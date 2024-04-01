'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';
import { Claim } from '@/app/_types/claim-types';

type ClaimsContext = {
  claimLookup: { [claimID: string]: Claim };
  claimIDs: string[]; //used for storing the order in which the claims are displayed
  setClaimLookup: React.Dispatch<React.SetStateAction<{ [claimID: string]: Claim }>>;
  setClaimIDs: React.Dispatch<React.SetStateAction<string[]>>;
  addClaim: (claim: Claim) => void;
  moveClaim: (startIndex: number, endIndex: number) => void;
  moveDefinition: (claimID: string, startIndex: number, endIndex: number) => void;
}

export const ClaimsContext = createContext<ClaimsContext | null>(null);

export function ClaimsContextProvider({ children }: { children: React.ReactNode }) {
  const [claimLookup, setClaimLookup] = useState<{ [claimID: string]: Claim }>({});
  const [claimIDs, setClaimIDs] = useState<string[]>([]);

  const addClaim = (claim: Claim) => {
    const claimID = claim.claimID;
    setClaimLookup(prevLookup => ({ ...prevLookup, [claimID]: claim }));
    setClaimIDs(prevIDs => [claimID,].concat(prevIDs));
  };

  const moveClaim = (startIndex: number, endIndex: number) => {
    setClaimIDs(prevClaimIDs => {
      let newClaimIDs = [...prevClaimIDs];
      const [removed] = newClaimIDs.splice(startIndex, 1);
      newClaimIDs.splice(endIndex, 0, removed);
      return newClaimIDs;
    });
  };

  const moveDefinition = (claimID: string, startIndex: number, endIndex: number) => {
    setClaimLookup(prevClaimLookup => {
      const claim = preClaimLookup[claimID];
      if (!claim) {
        throw new Error("Cannot move definition since claim doesn't exist");
      } else if (!('definitionClaimIDs' in claim)) {
        throw new Error("Cannot move definition since claim.definitionClaimIDs doesn't exist");
      } else {
        let newDefinitionClaimIDs = [...claim.definitionClaimIDs];
        const [removed] = newDefinitionClaimIDs.splice(startIndex, 1);
        newDefinitionClaimIDs.splice(endIndex, 0, removed);
        
        // Now, create a new claim object with the updated definitions
        const updatedClaim = { ...claim, definitionClaimIDs: newDefinitionClaimIDs };

        // Finally, return a new claimLookup object with the updated claim
        return { ...prevClaimLookup, [claimID]: updatedClaim };
      }
    });
  };

  return (
    <ClaimsContext.Provider
      value={{claimLookup, claimIDs, setClaimLookup, setClaimIDs, addClaim, moveClaim, moveDefinition}}>
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
