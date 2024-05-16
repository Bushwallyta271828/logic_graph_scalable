'use client';

import { fetchWrapper } from '@/app/_api/fetch-wrapper';


interface PartialRouter {refresh: () => void; push: (href: string) => void;}

function handleUnauthorized({response, router, redirectSignIn}: {
  response: {error: string, status: number | null} | {data: any, status: number},
  router: PartialRouter,
  redirectSignIn: boolean,
}) {
  //Resets AccountButton
  if (response.status === 401) {
    if (redirectSignIn === true) {router.push('/account/sign-in');}
    router.refresh();
  }
}

export async function get({path, router, deleteCookies = false, redirectSignIn = true}:
  {path: string, router: PartialRouter, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    deleteCookies: deleteCookies,
  });
  handleUnauthorized({response: response, router: router, redirectSignIn: redirectSignIn});
  return response;
}

export async function postForm({path, formData, router, deleteCookies = false, redirectSignIn = true}:
  {path: string, formData: FormData, router: PartialRouter, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: formData},
    deleteCookies: deleteCookies,
  });
  handleUnauthorized({response: response, router: router, redirectSignIn: redirectSignIn});
  return response;
}

export async function postJSON({path, data, router, deleteCookies = false, redirectSignIn = true}:
  {path: string, data: string, router: PartialRouter, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: data},
    headers: {'Content-Type': 'application/json'},
    deleteCookies: deleteCookies,
  });
  handleUnauthorized({response: response, router: router, redirectSignIn: redirectSignIn});
  return response;
}
