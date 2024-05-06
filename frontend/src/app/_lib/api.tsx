import { unstable_noStore as noStore } from 'next/cache';
import useSWR from 'swr';

//export async function fetchAPI({path}: {path: string}) {
//  noStore(); //Don't store process.env.BACKEND_ADDRESS.
//  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
//    return new Response('BACKEND_ADDRESS undefined');
//  } else {
//    try {
//      return fetch(process.env.BACKEND_ADDRESS + path, { cache: 'no-store' });
//    } catch {
//      return new Response('Unable to fetch');
//    }
//  }
//}

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
}

export function useFetchAPI(path) {
  const { data, error } = useSWR(() => path ? `${process.env.BACKEND_ADDRESS}${path}` : null, fetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
  };
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
