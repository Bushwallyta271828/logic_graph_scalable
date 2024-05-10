import { unstable_noStore as noStore } from 'next/cache';

export async function fetchWrapper<T>({path, data}: {path: string, data: T | null}) {
  //Call as fetchWrapper<null>(path: path, data: null) for GET,
  //fetchWrapper<T>(path: path, data: T) for POST.
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      const options: RequestInit = {cache: 'no-store'};
      if (data !== null) {
        options.method = 'POST';
        options.headers = {'Content-Type': 'application/json'};
        options.body = JSON.stringify(data);
      }
      const response = await fetch(process.env.BACKEND_ADDRESS + path, options);
      if (!response.ok) {throw new Error('Network response was not ok');}
      return response;
    } catch (error) {throw new Error('Unable to fetch');}
  }
}
