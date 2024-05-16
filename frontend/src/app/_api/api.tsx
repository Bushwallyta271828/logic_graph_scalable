'use client';

import { useRouter } from 'next/navigation';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';


export async function get({path, deleteCookies = false, redirectSignIn = true}:
  {path: string, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    deleteCookies: deleteCookies,
    redirectSignIn: redirectSignIn,
  });
  if ('error' in response) {
    router = useRouter();
    router.refresh(); //Resets AccountButton
  }
  return response;
}

export async function postForm({path, formData, deleteCookies = false, redirectSignIn = true}:
  {path: string, formData: FormData, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: formData},
    deleteCookies: deleteCookies,
    redirectSignIn: redirectSignIn,
  });
  if ('error' in response) {
    router = useRouter();
    router.refresh(); //Resets AccountButton
  }
  return response;
}

export async function postJSON({path, data = "{}", deleteCookies = false, redirectSignIn = true}:
  {path: string, data?: string, deleteCookies?: boolean, redirectSignIn?: boolean}) {
  const response = await fetchWrapper({
    path: path,
    options: {method: 'POST', body: data},
    headers: {'Content-Type': 'application/json'},
    deleteCookies: deleteCookies,
    redirectSignIn: redirectSignIn,
  });
  if ('error' in response) {
    router = useRouter();
    router.refresh(); //Resets AccountButton
  }
  return response;
}
