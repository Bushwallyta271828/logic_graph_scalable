'use server';

import { cookies } from 'next/headers';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';
import { Account } from '@/app/_account_context/account-context';


async function clearCookie(cookie: {name: string, value: string}) {
  'use server'; //This command shouldn't be needed but empirically it is?
  await (await cookies()).delete(cookie.name);
}

export async function getAccountAction(): Promise<Account> {
  //Note: this function should only ever be called from refreshAccount!
  //Otherwise, the account context could get out of sync!
  'use server'; //This command shouldn't be needed but empirically it is?
  const response = await fetchWrapper({path: 'users/account-details'});
  if ('data' in response) {
    if ('authenticated' in response.data && typeof response.data.authenticated === 'boolean') {
      if (response.data.authenticated === true) {
        if ('username' in response.data && typeof response.data.username === 'string') {
          return {status: 'signed in' as const, username: response.data.username};
        }
      } else {
        await (await (await cookies()).getAll()).map(clearCookie);
        return {status: 'signed out' as const};
      }
    }
    return {status: 'loading error' as const, loadingError: 'Unrecognized API return format'};
  } else {
    return {status: 'loading error' as const, loadingError: response.error};
  }
}