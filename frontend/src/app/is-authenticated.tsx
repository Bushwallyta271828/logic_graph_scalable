'use server';

import { cookies } from 'next/headers';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';


async function clearCookie(cookie: {name: string, value: string}) {
  'use server'; //This command shouldn't be needed but empirically it is?
  await (await cookies()).delete(cookie.name);
}

export async function isAuthenticated(): Promise<boolean | null> {
  //NOTE: This function should only ever be called from AccountButton!
  //If it were to be called in any other context, it would fail to update
  //the state of the AccountButton menu which could create an inconsistent
  //user interface!
  'use server'; //This command shouldn't be needed but empirically it is?
  const response = await fetchWrapper({
    path: 'users/authenticated', //This path should only ever be accessed here!
    deleteCookies: false,
    redirectSignIn: false,
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
