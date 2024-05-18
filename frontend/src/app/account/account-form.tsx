'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountContext } from '@/app/_account_context/account-context';
import { postForm } from '@/app/_api/api';


export function AccountForm({children, path, redirectSignIn, afterSuccess, redirectOnSuccess}: {
  children: React.ReactNode,
  path: string,
  redirectSignIn: boolean
  afterSuccess?: (formData: FormData) => void,
  redirectOnSuccess?: string,
}) {
  //children is for the form contents.
  //path is the path for the API call.
  //If redirectSignIn is true then AccountForm redirects to the sign-in page if a 401 status occurs. 
  //If afterSuccess is supplied then AccountForm calls that function with the form data upon successful form submission.
  //If redirectOnSuccess is supplied then AccountForm redirects there upon successful form submission.
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setAccout } = useAccountContext();
 
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
      setError(response.error);
    } else {
      setError(null);
      if (afterSuccess !== undefined) {afterSuccess(formData);}
      if (redirectOnSuccess !== undefined) {router.push(redirectOnSuccess);}
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>{children}</form>
      {(error === null) ? null : <p>{error}</p>}
    </>
  );
}
