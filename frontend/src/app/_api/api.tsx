'use client';

import { NextRouter } from 'react/router';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';


function potentialRefresh({response, router}:
  {response: {error: string, status: number | null} | {data: any, status: number}, router: NextRouter}) {
  //Resets AccountButton
  if (response.status === 401) {
    router.refresh();
  }
}

export async function get({path, router, deleteCookies = false, redirectSignIn = true}:
  {path: string, router: NextRouter, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    deleteCookies: deleteCookies,
    redirectSignIn: redirectSignIn,
  });
  potentialRefresh({response: response, router: router});
  return response;
}

export async function postForm({path, router, formData, deleteCookies = false, redirectSignIn = true}:
  {path: string, router: NextRouter, formData: FormData, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: formData},
    deleteCookies: deleteCookies,
    redirectSignIn: redirectSignIn,
  });
  potentialRefresh({response: response, router: router});
  return response;
}

export async function postJSON({path, router, data = "{}", deleteCookies = false, redirectSignIn = true}:
  {path: string, router: NextRouter, data?: string, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: data},
    headers: {'Content-Type': 'application/json'},
    deleteCookies: deleteCookies,
    redirectSignIn: redirectSignIn,
  });
  potentialRefresh({response: response, router: router});
  return response;
}
