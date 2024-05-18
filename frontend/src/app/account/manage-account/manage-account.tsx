'use client';

import { useAccountContext } from '@/app/_account_context/account-context';
import { AccountForm } from '@/app/account/account-form';


export function ManageAccount() {
  const { account } = useAccountContext();

  return (
    <>
      <AccountForm path="users/change-username" redirectSignIn={true} usernameField="new-username">
        <div>
          {(account.status === 'loading') ? <p className="italic">Loading username...</p> :
            (account.status === 'error') ? <p className="text-bright-danger">Error: {account.error}</p> :
            (account.status === 'signed out') ? <p>You currently appear to be signed out.</p> :
            <p>Current username: {account.username}</p>
          }
          <label htmlFor="new-username">New Username:</label>
          <input type="text" id="new-username" name="new-username" required />
        </div>
        <button type="submit">Update Username</button>
      </AccountForm>
      <AccountForm path="users/change-password" redirectSignIn={true}>
        <div>
          <label htmlFor="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" required />
        </div>
        <button type="submit">Update Password</button>
      </AccountForm>
    </>
  );
}
