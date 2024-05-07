'use client';

import { unstable_noStore as noStore } from 'next/cache';
import { useSWR } from 'swr';

export function useFetchAPI({path}: {path: string}) {
  const fetchAPI = async (path: string) => {
    noStore(); //Don't store process.env.BACKEND_ADDRESS.
    if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
      throw new Error('BACKEND_ADDRESS undefined');
    } else {
      try {
        const response = fetch(process.env.BACKEND_ADDRESS + path, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('An error occurred while fetching data');
        }
        return response;
      } catch {
        throw new Error('Unable to fetch');
      }
    }
  }

  const { data, error, isValidating } = useSWR(process.env.BACKEND_ADDRESS + path, fetchAPI);
  return {data, error, isValidating};
}

export async function postAPI(path, data) {
  const url = `${process.env.BACKEND_ADDRESS}${path}`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;  // Rethrow to handle errors in the component
  }
}
