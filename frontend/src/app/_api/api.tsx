'use client';

import { SetAccount } from '@/app/_account_context/account-context';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';


interface PartialRouter {push: (href: string) => void;}

/* For all of these functions:
 * path is the path of the API to call.
 * setAccount should update the account state in case of an authentication error.
 * If a router is provided, then authentication errors will re-direct to the sign-in page.
 * If forceSignOut === true then all cookies will be deleted and the user will be signed out,
 * regardless of request outcome.
 */

export async function get({path, setAccount, router, forceSignOut = false}:
  {path: string, setAccount: SetAccount, router?: PartialRouter, forceSignOut?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    deleteCookies: deleteCookies,
  });
  if (response.status === 401 && router !== undefined)
    {router.push('/account/sign-in');}
  if (response.status === 401 || forceSignOut)
    {setAccount('signed out' as const);}
  return response;
}

export async function postForm({path, formData, setAccount, router, forceSignOut = false}:
  {path: string, formData: FormData, setAccount: SetAccount, router?: PartialRouter, forceSignOut?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: formData},
    deleteCookies: deleteCookies,
  });
  if (response.status === 401 && router !== undefined)
    {router.push('/account/sign-in');}
  if (response.status === 401 || forceSignOut)
    {setAccount('signed out' as const);}
  return response;
}

export async function postJSON({path, data, setAccount, router, forceSignOut = false}:
  {path: string, data: string, setAccount: SetAccount, router?: PartialRouter, forceSignOut?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: data},
    headers: {'Content-Type': 'application/json'},
    deleteCookies: deleteCookies,
  });
  if (response.status === 401 && router !== undefined)
    {router.push('/account/sign-in');}
  if (response.status === 401 || forceSignOut)
    {setAccount('signed out' as const);}
  return response;
}
