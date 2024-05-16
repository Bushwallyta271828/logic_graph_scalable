'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { postForm } from '@/app/_api/api';


export function AccountForm({path, redirect, children}: 
  {path: string, redirect: string | null, children: Readonly<{children: React.ReactNode}>}) {
  //path is the path for the API call.
  //redirect is the path to redirect towards if the submission is successful.
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
      if (redirect !== null) {
        router.push(redirect);
      }
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
