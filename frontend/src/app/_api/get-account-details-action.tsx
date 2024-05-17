'use server';

import { cookies } from 'next/headers';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';
import { Account } from '@/app/_account_context/account-context';


async function clearCookie(cookie: {name: string, value: string}) {
  'use server'; //This command shouldn't be needed but empirically it is?
  await (await cookies()).delete(cookie.name);
}

export async function getAccountDetailsAction(): Promise<{account: Account} | null> {
  'use server'; //This command shouldn't be needed but empirically it is?
  const response = await fetchWrapper({
    path: 'users/account-details', //This path should only ever be accessed here!
    deleteCookies: false,
  });
  if ('data' in response) {
    if ('authenticated' in response.data && typeof response.data.authenticated === 'boolean') {
      if (response.data.authenticated === false) {
        await (await (await cookies()).getAll()).map(clearCookie);
        return {account: null};
      } else {
        if ('username' in response.data && typeof response.data.username === 'string') {
          return {account: {username: response.data.username}};
        }
      }
    }
  }
  return null;
}
