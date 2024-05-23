'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountContext } from '@/app/_account_context/account-context';
import { postForm } from '@/app/_api/api';


export function AccountForm({children, path, redirectSignIn, afterSuccess, usernameField}: {
  children: React.ReactNode,
  path: string,
  redirectSignIn: boolean,
  afterSuccess: boolean | string,
  usernameField?: string,
}) {
  //children is for the form contents.
  //path is the path for the API call.
  //If redirectSignIn is true then AccountForm redirects to the sign-in page if a 401 status occurs. 
  //If afterSuccess is false then upon success AccountForm will do nothing.
  //If afterSuccess is true then upon success AccountForm will display the response message from the backend.
  //If afterSuccess is a string then upon success AccountForm will redirect to that path.
  //If usernameField is supplied then upon success AccountForm will set the username to the value of that field.
  const [result, setResult] = useState<
    {returned: false} |
    {returned: true, message: string, error: boolean}
  >({returned: false as const});
  const router = useRouter();
  const { setAccount } = useAccountContext();
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await postForm({
      path: path,
      formData: formData,
      setAccount: setAccount,
      router: (redirectSignIn === true) ? router : undefined,
    });
    if ('error' in response) {
      setResult({returned: true as const, message: response.error, error: true});
    } else {
      const message =
        (typeof response.data === 'object'
          && 'message' in response.data
          && typeof response.data.message === 'string'
        ) ? response.data.message : 'No message provided';
      setResult({returned: true as const, message: message, error: false});
      if (usernameField !== undefined) {
        const username = formData.get(usernameField);
        if (typeof username === 'string')
          {setAccount({status: 'signed in' as const, username: username});}
        else //Should never happen
          {setAccount({status: 'error' as const, error: 'Form usernameField specified incorrectly'});}
      }
      if (typeof afterSuccess === 'string') {router.push(afterSuccess);}
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">{children}</form>
      {(result.returned === true && result.error === true) ? 
        <p className="bg-dark-danger w-full px-4 py-2 rounded-md text-white text-sm text-center">
          Error: {result.message}
        </p>
        : (result.returned === true && result.error === false && afterSuccess === true) ?
        <p className="bg-bright-neutral w-full px-4 py-2 rounded-md text-white text-sm text-center">
          {result.message}
        </p>
        : null
      }
    </>
  );
}
