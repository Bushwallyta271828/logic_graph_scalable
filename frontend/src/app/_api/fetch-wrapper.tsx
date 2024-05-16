'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { parse, splitCookiesString } from 'set-cookie-parser';
import { redirect } from 'next/navigation';

async function setHeaderCookies(headerValue: string, headerName: string) {
  'use server'; //This shouldn't be needed but empirically it is?
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

export async function fetchWrapper({path, options = {}, headers = {}}:
  {path: string, options?: RequestInit, headers?: Record<string, string>}) {
  'use server'; //This shouldn't be needed but empirically it is?
  //options.headers and options.cache will be ignored.
  //options and headers may both be modified.
  //Note that this function is for server-side use only.

  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      options.cache = 'no-store';
      const sessionidCookie = await (await cookies()).get('sessionid');
      if (sessionidCookie !== undefined) {
        headers['Cookie'] = 'sessionid='+sessionidCookie.value;
      }
      options.headers = headers;
      const response = await fetch(process.env.BACKEND_ADDRESS + path, options);

      response.headers.forEach(setHeaderCookies);

      if (response.status === 401 && await (await cookies()).has('sessionid')) {
        await (await cookies()).delete('sessionid');
        redirect('/account/sign-in'); //Will refresh AccountButton
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}
