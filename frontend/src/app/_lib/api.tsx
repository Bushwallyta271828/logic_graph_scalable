import { unstable_noStore as noStore } from 'next/cache';

export async function fetchWrapper({path, options}: {path: string, options: RequestInit}) {
  //For GET, options should be {}.
  //For POST with formData, options should be {method: 'POST', body: formData}.
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      const response = await fetch(process.env.BACKEND_ADDRESS + path, {...options, cache: 'no-store'});
      return response;
    } catch (error) {throw new Error('Unable to fetch');}
  }
}
