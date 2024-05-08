'use client';

import { unstable_noStore as noStore } from 'next/cache';
import { useSWR } from 'swr';
import { useSWRMutation } from 'swr/mutation';

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

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

function App() {
  const { trigger } = useSWRMutation('/api/user', sendRequest)

  return <button onClick={() => {
    trigger({ username: 'johndoe' })
  }}>Create User</button>
}

/////////////////////////////////


import useSWRMutation from 'swr/mutation'

async function getData(url, { arg: token }) {
  ... // Fetcher implementation.
      // The extra argument will be passed via the `arg` property of the 2nd parameter.
}

// A useSWR + mutate like API, but it will never start the request.
const { data, error, trigger, reset, isMutating } = useSWRMutation('/api/user', getData, {
  // options
  onError,
  onSuccess,
  revalidate = true, // auto revalidate after mutation
  populateCache = false, // write back the response to the cache after mutation
  optimisticData,
  rollbackOnError
})
