'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { parse, splitCookiesString } from 'set-cookie-parser';


async function clearCookie(cookie: {name: string, value: string}) {
  'use server'; //This command shouldn't be needed but empirically it is?
  await (await cookies()).delete(cookie.name);
}

async function setHeaderCookies(headerValue: string, headerName: string) {
  'use server'; //This command shouldn't be needed but empirically it is?
  //Thanks to https://stackoverflow.com/a/77446172 for the ideas on cookie handling.

  if (headerName.toLowerCase() === 'set-cookie') {
    for (const cookieObject of parse(splitCookiesString(headerValue))) {
      //Note: I have to unpack everything manually for type checking reasons.
      //These properties are all of the properties that cookieObject can possess.
      const sameSite = (cookieObject.sameSite === undefined)
        ? undefined : cookieObject.sameSite.toLowerCase();
      await (await cookies()).set({
        name: cookieObject.name,
        value: cookieObject.value,
        path: cookieObject.path,
        expires: cookieObject.expires,
        maxAge: cookieObject.maxAge,
        domain: cookieObject.domain,
        secure: cookieObject.secure,
        httpOnly: cookieObject.httpOnly,
        sameSite: (sameSite as 'lax' | 'strict' | 'none' | boolean | undefined),
      });
    }
  }
}

export async function fetchWrapper({path, options = {}, headers = {}, deleteCookies = false}:
  {path: string, options?: RequestInit, headers?: Record<string, string>, deleteCookies?: boolean}):
  Promise<{error: string, status: number | null} | {data: any, status: number}> {
  //options.headers and options.cache will be ignored.
  //options and headers may both be modified.
  //If deleteCookies === true then all cookies will be deleted after the fetch.
  //Be extremely careful calling this function directly as opposed to through the dedicated API functions!
  //Account information will not automatically refresh!
  'use server'; //This command shouldn't be needed but empirically it is?
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    return {error: 'BACKEND_ADDRESS undefined', status: null};
  } else {
    try {
      options.cache = 'no-store';
      const sessionidCookie = await (await cookies()).get('sessionid');
      if (sessionidCookie !== undefined) {
        headers['Cookie'] = 'sessionid='+sessionidCookie.value;
      }
      options.headers = headers;

      const response = await fetch(process.env.BACKEND_ADDRESS + path, options);

      if (response.status === 401 || deleteCookies)
        {await (await (await cookies()).getAll()).map(clearCookie);}
      else {response.headers.forEach(setHeaderCookies);}

      const data = await response.json();
      if (response.ok) {return {data: data, status: response.status};}
      else {
        return {
          error: (typeof data === 'object' && 'message' in data && typeof data.message === 'string')
            ? data.message : await response.text(),
          status: response.status,
        };
      }
    } catch (error) {
      return {error: 'Error while fetching', status: null};
    }
  }
}
