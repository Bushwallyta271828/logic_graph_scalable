'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';

type UserContext = {
  user: string | null;
  setUser: SetStateAction<string | null>;
}

export const UserContext = createContext<UserContext | null>(null);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{user, setUser,}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserContextProvider!");
  }
  return context;
}
