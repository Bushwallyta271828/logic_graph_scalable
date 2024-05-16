'use client';

//Credit to the tutorial at https://www.youtube.com/watch?v=I7dwJxGuGYQ for the template!

import { createContext, useContext, useState } from 'react';

export type Account = null | {username: string};

export const AccountContext =
  createContext<{account: Account, setAccount: (newAccount: Account) => void} | null>(null);

export function AccountContextProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account>(null);
  return (<AccountContext.Provider value={{account,setAccount}}>{children}</AccountContext.Provider>);
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (context === null)
    {throw new Error("useAccountContext must be used within an AccountContextProvider");}
  return context;
}
