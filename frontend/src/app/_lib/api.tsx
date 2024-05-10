import { unstable_noStore as noStore } from 'next/cache';

async function fetchWrapper({path, options}: {path: string, options: RequestInit}) {
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      const response = await fetch(process.env.BACKEND_ADDRESS + path, {...options, cache: 'no-store'});
      if (!response.ok) {throw new Error('Network response was not ok');}
      return response;
    } catch (error) {throw new Error('Unable to fetch');}
  }
}

export async function get({path}: {path: string}) {
  return fetchWrapper({path: path, options: {}});
}

export async function post<T>({path, data}: {path: string, data: T}) {
  return fetchWrapper({
    path: path,
    options: {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)}
  });
}
