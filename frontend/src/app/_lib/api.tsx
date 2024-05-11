import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { parse, splitCookiesString } from 'set-cookie-parser';

export async function fetchWrapper({path, options}: {path: string, options: RequestInit}) {
  //For GET, options should be {}.
  //For POST with formData, options should be {method: 'POST', body: formData}.
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      const response = await fetch(process.env.BACKEND_ADDRESS + path, {...options, cache: 'no-store'});
      response.headers.forEach((value, name) => {
        if (name.toLowerCase() === 'set-cookie') {
          for (const cookie of parse(splitCookiesString(value))) {
            cookies().set(cookie.name, cookie.value, COME BACK);
          }
        }
      });
      return response;
    } catch (error) {throw new Error('Unable to fetch');}
  }
}
