'use client';

import { fetchWrapper } from '@/app/_api/fetch-wrapper';


export async function get({path}: {path: string}) {
  return await fetchWrapper({path: path});
}

export async function postForm({path, formData}: {path: string, formData: FormData}) {
  return await fetchWrapper({path: path, options: {method: 'POST', body: formData}});
}

export async function postJSON({path, data = "{}"}: {path: string, data?: string}) {
  return await fetchWrapper({
    path: path,
    options: {
      method: 'POST',
      body: data,
    },
    headers: {'Content-Type': 'application/json'},
  });
}
