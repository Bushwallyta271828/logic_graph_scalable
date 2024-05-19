'use client';

import { useAccountContext } from '@/app/_account_context/account-context';


export function DisplayUsername() {
  const { account } = useAccountContext();

  if (account.status === 'loading')
    {return (<p className="text-sm text-white italic">Loading username...</p>);}
  else if (account.status === 'error')
    {return (<p className="text-sm text-bright-danger">Error while determining username: {account.error}</p>);}
  else if (account.status === 'signed out')
    {return (<p className="text-sm text-white">You currently appear to be signed out.</p>);}
  else
    {return (<p className="text-sm text-white">Your current username is {account.username}.</p>);}
}
