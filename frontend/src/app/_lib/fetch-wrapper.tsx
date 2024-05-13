import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { parse, splitCookiesString } from 'set-cookie-parser';

export async function fetchWrapper({path, options}: {path: string, options: RequestInit}) {
  //For GET, options should be {}.
  //For POST, options should be {method: 'POST', body: dataAsJson}.
  //Note that this function is for server-side use.
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    throw new Error('BACKEND_ADDRESS undefined');
  } else {
    try {
      let headers: Record<string, string> = {};
      if (options.method === 'POST')
        {headers['Content-Type'] = 'application/json';}
      const sessionidCookie = await (await cookies()).get('sessionid');
      if (sessionidCookie !== undefined)
        {headers['Cookie'] = 'sessionid='+sessionidCookie.value;}

      const response = await fetch(process.env.BACKEND_ADDRESS + path,
        {...options, cache: 'no-store', headers: headers});

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
