'use client';

import { useAccountContext } from '@/app/_account_context/account-context';


export function DisplayUsername() {
  const { account } = useAccountContext();

  return ({
    (account.status === 'loading') ? <p className="text-white text-sm italic">Loading username...</p> :
    (account.status === 'error') ?
      <p className="text-bright-danger text-sm">Error while determining username: {account.error}</p> :
    (account.status === 'signed out') ? <p className="text-white text-sm">You currently appear to be signed out.</p> :
    <p className="text-white text-sm">Your current username is {account.username}</p>
  });
}
