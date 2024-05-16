'use client';

import { useRouter } from 'next/navigation';
import { fetchWrapper } from '@/app/_api/fetch-wrapper';


export async function get({path}: {path: string}) {
  const response = await fetchWrapper({path: path});
  router = useRouter();
  router.refresh();
  return response;
}

export async function postForm({path, formData}: {path: string, formData: FormData}) {
  const response = await fetchWrapper({path: path, options: {method: 'POST', body: formData}});
  router = useRouter();
  router.refresh();
  return response;
}

export async function postJSON({path, data = "{}"}: {path: string, data?: string}) {
  const response = await fetchWrapper({
    path: path,
    options: {
      method: 'POST',
      body: data,
    },
    headers: {'Content-Type': 'application/json'},
  });
  router = useRouter();
  router.refresh();
  return response;
}
