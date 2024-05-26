'use client';

import { SetAccount } from '@/app/_account_context/account-context';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';


interface PartialRouter {push: (href: string) => void;}

/* For all of these functions:
 * path is the path of the API to call.
 * setAccount should update the account state in case of an authentication error.
 * If a router is provided, then authentication errors will re-direct to the sign-in page.
 *
 * For sendForm and sendJSON:
 * If forceSignOut === true then all cookies will be deleted and the user will be signed out,
 * regardless of request outcome.
 */

export async function get({path, setAccount, router}:
  {path: string, setAccount: SetAccount, router?: PartialRouter}) {
  const response = await fetchWrapper({path: path});
  if (response.status === 401) {
    if (router !== undefined) {router.push('/account/sign-in');}
    setAccount({status: 'signed out' as const});
  }
  return response;
}

export async function sendForm({method, path, formData, setAccount, router, forceSignOut = false}:
  {method: string, path: string, formData: FormData, setAccount: SetAccount, router?: PartialRouter, forceSignOut?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: method, body: formData},
    deleteCookies: forceSignOut,
  });
  if (response.status === 401 && router !== undefined)
    {router.push('/account/sign-in');}
  if (response.status === 401 || forceSignOut)
    {setAccount({status: 'signed out' as const});}
  return response;
}

export async function sendJSON({method, path, data, setAccount, router, forceSignOut = false}:
  {method: string, path: string, data: string, setAccount: SetAccount, router?: PartialRouter, forceSignOut?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: method, body: data},
    headers: {'Content-Type': 'application/json'},
    deleteCookies: forceSignOut,
  });
  if (response.status === 401 && router !== undefined)
    {router.push('/account/sign-in');}
  if (response.status === 401 || forceSignOut)
    {setAccount({status: 'signed out' as const});}
  return response;
}
