'use client';

import { useAccountContext } from '@/app/_account_context/account-context';


export function DisplayUsername() {
  const { account } = useAccountContext();

  if (account.status === 'loading') {return (<p className="italic">Loading username...</p>);}
  else if (account.status === 'error') {return (<p className="text-bright-danger">Error: {account.error}</p>);}
  else if (account.status === 'signed out') {return (<p>You currently appear to be signed out.</p>);}
  else {return (<p>Current username: {account.username}</p>);}
}
