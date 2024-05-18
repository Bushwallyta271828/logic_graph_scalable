'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccountContext } from '@/app/_account_context/account-context';
import { postForm } from '@/app/_api/api';


export function AccountForm({children, path, redirect, afterSuccess}: 
  {children: React.ReactNode, path: string, redirect?: string, afterSuccess?: () => void}) {
  //path is the path for the API call.
  //If redirect is supplied then AccountForm redirects there upon successful form submission.
  //If afterSuccess is supplied then AccountForm calls that function upon successful form submission.
  //children should contain the form contents.
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setAccout } = useAccountContext();
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postForm({
      path: path,
      formData: new FormData(event.currentTarget),
      router: router,
    });
    if ('error' in response) {
      setError(response.error);
    } else {
      setError(null);
      if (redirect !== undefined) {router.push(redirect);}
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
