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

export async function post<T>({path, data}: {path: string, data: T}) {
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      const response = await fetch(process.env.BACKEND_ADDRESS + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { status, message } = await response.json();
      return { status: status, message: message };
    } catch (error) {
      throw new Error('Failed to post data');
    }
  }
}
