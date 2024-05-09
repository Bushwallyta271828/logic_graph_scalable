'use client';

import { unstable_noStore as noStore } from 'next/cache';
import { useSWR } from 'swr';

export async function fetchWrapper<T>({path, data}: {path: string, data: T | null}) {
  //Call as fetchWrapper<null>(path: path, data: null) for GET,
  //fetchWrapper<T>(path: path, data: T) for POST.
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      if (data === null) {
        const response = await fetch(process.env.BACKEND_ADDRESS + path, { cache: 'no-store' });
      } else {
        const response = await fetch(process.env.BACKEND_ADDRESS + path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          cache: 'no-store',
        });
      }
      if (!response.ok) {throw new Error('Network response was not ok');}
      return response;
    } catch (error) {throw new Error('Unable to fetch');}
  }
}

export function useGet({path}: {path: string}) {
  const get = async (path: string) => {return fetchWrapper<null>({path: path, data: null});}
  const { data, error, isValidating } = useSWR(path, get);
  return {data, error, isValidating};
}
