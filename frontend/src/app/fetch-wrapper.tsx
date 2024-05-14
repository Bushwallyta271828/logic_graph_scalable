import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { parse, splitCookiesString } from 'set-cookie-parser';

async function fetchWrapper({path, options}: {path: string, options: RequestInit}) {
  //If options has headers attribute then headers should have type Record<string, string>.
  //options.cache and options.headers may be modified.
  //Note that this function is for server-side use.
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      options.cache = 'no-store';
      const sessionidCookie = await (await cookies()).get('sessionid');
      if (sessionidCookie !== undefined) {
        if (options.headers === undefined) {options.headers = {} as Record<string, string>;}
        options.headers['Cookie'] = 'sessionid='+sessionidCookie.value;
      }

      const response = await fetch(process.env.BACKEND_ADDRESS + path, options);

      //Thanks to https://stackoverflow.com/a/77446172 for the ideas on cookie handling.
      response.headers.forEach((headerValue, headerName) => {
        if (headerName.toLowerCase() === 'set-cookie') {
          for (const cookieObject of parse(splitCookiesString(headerValue))) {
            //Note: I have to unpack everything manually for type checking reasons.
            //These properties are all of the properties that cookieObject can possess.
            const sameSite = (cookieObject.sameSite === undefined)
              ? undefined : cookieObject.sameSite.toLowerCase();
            cookies().set({
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
      });

      return response;
    } catch (error) {throw new Error('Unable to fetch');}
  }
}

export async function get({path}: {path: string}) {
  return await fetchWrapper({path: path, options: {}});
}

export async function postForm({path, formData}: {path: string, formData: FormData}) {
  return await fetchWrapper({path: path, options: {method: 'POST', body: formData}});
}

export async function postJSON({path, data}: {path: string, data: string}) {
  return await fetchWrapper({
    path: path,
    options: {
      method: 'POST',
      body: data,
      headers: {'Content-Type': 'application/json'} as Record<string, string>,
    },
  });
}
