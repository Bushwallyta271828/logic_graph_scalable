'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';
import { Claim } from '@/app/_types/claim-types';

type ClaimsContext = {
  claims: Claim[],
  setClaims: React.Dispatch<React.SetStateAction<Claim[]>>;
}

export const ClaimsContext = createContext<ClaimsContext | null>(null);

export function ClaimsContextProvider({ children }: { children: React.ReactNode }) {
  const [claims, setClaims] = useState([]);
  return (
    <ClaimsContext.Provider value={{claims, setClaims}}>
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
