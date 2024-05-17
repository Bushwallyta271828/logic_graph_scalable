'use client';

import { getAccountDetailsAction } from '@/app/_api/get-account-details-action';
import { Account, SetAccount } from '@/app/_account_context/account-context';


export async function getAccountClient({setAccount}: {setAccount: SetAccount}):
  Promise<{account: Account} | null> {
  const 
  const response = await fetchWrapper({
    path: 'users/authenticated', //This path should only ever be accessed here!
    deleteCookies: false,
  });
  if ('data' in response) {
    if ('authenticated' in response.data && typeof response.data.authenticated === 'boolean') {
      if (response.data.authenticated === false)
        {await (await (await cookies()).getAll()).map(clearCookie);}
      return response.data.authenticated;
    }
  }
  return null;
}
