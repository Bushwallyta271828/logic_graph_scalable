'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postForm } from '@/app/_api/api';


export function AccountForm({children, path, redirectOrRefresh = false}: 
  {children: React.ReactNode, path: string, redirectOrRefresh?: string | boolean}) {
  //path is the path for the API call.
  //If redirectOrRefresh is a string, AccountForm redirects there upon successful submission.
  //If redirectOrRefresh is true, AccountForm refreshes upon successful submission.
  //If redirectOrRefresh is false, AccountForm does nothing upon successful submission.
  //children should contain the form contents.
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
 
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
      if (typeof redirectOrRefresh === 'string')
        {router.push(redirectOrRefresh);}
      if (redirectOrRefresh === true)
        {router.refresh();}
      setError(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>{children}</form>
      {(error === null) ? null : <p>{error}</p>}
    </>
  );
}
