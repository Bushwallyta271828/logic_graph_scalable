'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { postForm } from '@/app/_api/api';


export function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
 
  const handleSignInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postForm({
      path: 'users/sign-in',
      formData: new FormData(event.currentTarget),
      router: router,
    });
    if ('error' in response) {
      setError(response.error);
    } else {
      router.push('/debates'); //Moving from sign-in to debates refreshes AccountButton
      setError(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSignInSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {(error === null) ? null : <p>{error}</p>}
    </>
  );
}
