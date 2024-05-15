'use server';

import { get } from '@/app/api';

export async function isAuthenticated(): Promise<boolean | null> {
  //NOTE: This function should only ever be called from AccountButton!
  //If it were to be called in any other context, it would fail to update
  //the state of the AccountButton menu which could create an inconsistent
  //user interface!
  'use server';
  const response = await get({path: 'users/authenticated'});
  if (response.ok) {
    const data = await response.json();
    if ('authenticated' in data) {
      return data.authenticated;
    }
  }
  return null;
}
