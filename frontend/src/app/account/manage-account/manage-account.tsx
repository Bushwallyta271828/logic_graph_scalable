'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get } from '@/app/_api/api';
import { AccountForm } from '@/app/account/account-form';


export function ManageAccount() {
  const [accountDetails, setAccountDetails] =
    useState<{username: string, email: string} | {error: string} | 'loading'>('loading' as const);
  const router = useRouter();

  useEffect(() => {
    const checkAccountDetails = async () => {
      const response = await get({path: "users/account-details", router: router});
      if ('data' in response) {
        if (
          'username' in response.data && typeof response.data.username === 'string' &&
          'email' in response.data && typeof response.data.email === 'string'
        ) {setAccountDetails({username: response.data.username, email: response.data.email});}
        else {setAccountDetails({error: "Unexpected API return type"});}
      } else {setAccountDetails({error: response.error});}
    };
    checkAccountDetails();
  }, []);

  return (
    <>
      <AccountForm path="users/change-username" redirectOrRefresh={true}>
        <div>
          {(accountDetails === 'loading') ? <p className="italic">Loading username...</p> :
            ('error' in accountDetails) ? <p className="text-bright-danger">Error: {accountDetails.error}</p> :
            <p>Current username: {accountDetails.username}</p>
          }
          <label htmlFor="new-username">New Username:</label>
          <input type="text" id="new-username" name="new-username" required />
        </div>
        <button type="submit">Update Username</button>
      </AccountForm>
      <AccountForm path="users/change-email" redirectOrRefresh={true}>
        <div>
          {(accountDetails === 'loading') ? <p className="italic">Loading email...</p> :
            ('error' in accountDetails) ? <p className="text-bright-danger">Error: {accountDetails.error}</p> :
            <p>Current email: {accountDetails.email}</p>
          }
          <label htmlFor="new-email">New Email:</label>
          <input type="text" id="new-email" name="new-email" required />
        </div>
        <button type="submit">Update Email</button>
      </AccountForm>
      <AccountForm path="users/change-password" redirectOrRefresh="/debates">
        <div>
          <label htmlFor="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" required />
        </div>
        <button type="submit">Update Password</button>
      </AccountForm>
    </>
  );
}
