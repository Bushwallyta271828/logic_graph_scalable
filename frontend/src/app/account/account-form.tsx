'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountContext } from '@/app/_account_context/account-context';
import { postForm } from '@/app/_api/api';


export function AccountForm({children, path, redirectSignIn, displaySuccess, usernameField, redirectOnSuccess}: {
  children: React.ReactNode,
  path: string,
  redirectSignIn: boolean,
  displaySuccess: boolean,
  usernameField?: string,
  redirectOnSuccess?: string,
}) {
  //children is for the form contents.
  //path is the path for the API call.
  //If redirectSignIn is true then AccountForm redirects to the sign-in page if a 401 status occurs. 
  //If displaySuccess is true then AccountForm will display backend messages on success.
  //If usernameField is supplied then upon successful form submission AccountForm will set
  //the account username to the value of that field.
  //If redirectOnSuccess is supplied then AccountForm redirects there upon successful form submission.
  const [result, setResult] = useState<null | {message: string, error: boolean}>(null);
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
      setResult({message: response.error, error: true});
    } else {
      const message = ('message' in response.data && typeof response.data.message === 'string') ?
        response.data.message : 'No message provided';
      setResult({message: message, error: false});
      if (usernameField !== undefined) {
        const username = formData.get(usernameField);
        if (typeof username === 'string')
          {setAccount({status: 'signed in' as const, username: username});}
        else //Should never happen
          {setAccount({status: 'error' as const, error: 'Form usernameField specified incorrectly'});}
      }
      if (redirectOnSuccess !== undefined) {router.push(redirectOnSuccess);}
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">{children}</form>
      {(result === null) ? null :
        (result.error === true) ?
        <p className="bg-dark-danger w-full px-4 py-2 rounded-md text-white text-sm">
          Error: {result.message}
        </p> :
        <p className="bg-medium-neutral w-full px-4 py-2 rounded-md text-white text-sm">
          {result.message}
        </p>
      }
    </>
  );
}
