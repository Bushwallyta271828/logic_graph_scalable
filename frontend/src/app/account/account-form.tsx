'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountContext } from '@/app/_account_context/account-context';
import { postForm } from '@/app/_api/api';


export function AccountForm({children, path, redirectOnSuccess, afterSuccess, redirectSignIn = true}: {
  children: React.ReactNode,
  path: string,
  redirectOnSuccess?: string,
  afterSuccess?: () => void,
  redirectSignIn?: boolean
}) {
  //children is for the form contents.
  //path is the path for the API call.
  //If redirectOnSuccess is supplied then AccountForm redirects there upon successful form submission.
  //If afterSuccess is supplied then AccountForm calls that function upon successful form submission.
  //If redirectSignIn is true then AccountForm redirects to the sign-in page if a 401 status occurs. 
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setAccout } = useAccountContext();
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postForm({
      path: path,
      formData: new FormData(event.currentTarget),
      setAccount: setAccount,
      router: (redirectSignIn === true) ? router : undefined,
    });
    if ('error' in response) {
      setError(response.error);
    } else {
      setError(null);
      if (redirectOnSuccess !== undefined) {router.push(redirectOnSuccess);}
      if (afterSuccess !== undefined) {afterSuccess();}
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>{children}</form>
      {(error === null) ? null : <p>{error}</p>}
    </>
  );
}
