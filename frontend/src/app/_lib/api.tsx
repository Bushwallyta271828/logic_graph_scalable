'use client';

import { unstable_noStore as noStore } from 'next/cache';
import { useSWR } from 'swr';
import { useSWRMutation } from 'swr/mutation';

export function useGet({path}: {path: string}) {
  const get = async (path: string) => {
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

  const { data, error, isValidating } = useSWR(path, get);
  return {data, error, isValidating};
}

//export function postAPI(path, data) {
//  const url = `${process.env.BACKEND_ADDRESS}${path}`;
//  const fetchOptions = {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(data),
//  };
//
//  try {
//    const response = await fetch(url, fetchOptions);
//    if (!response.ok) {
//      throw new Error(`HTTP error! Status: ${response.status}`);
//    }
//    return await response.json();
//  } catch (error) {
//    console.error('Fetch error:', error);
//    throw error;  // Rethrow to handle errors in the component
//  }
//}


export function usePost({path}: {path: string}) {
  const post = async ({path, data}: {path: string, data: string}) => {
    noStore(); //Don't store process.env.BACKEND_ADDRESS.
    if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
      throw new Error('BACKEND_ADDRESS undefined');
    } else {
      try {
        const response = fetch(process.env.BACKEND_ADDRESS + path,
          { method: 'POST', body: JSON.stringify(data), cache: 'no-store' });
        if (!response.ok) {
          throw new Error('An error occurred while fetching data');
        }
        return response;
      } catch {
        throw new Error('Unable to fetch');
      }
    }
  }

  const { data, error, trigger, reset, isMutating } = useSWRMutation('/api/user', post);
  return { error, isMutating };
}
