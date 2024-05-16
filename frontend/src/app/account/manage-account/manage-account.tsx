'use client';

//import { useRouter } from 'next/router';
//import { get } from '@/app/_api/api';
import { AccountForm } from '@/app/account/account-form';


//async function getAccountDetails({router}: {router: NextRouter}) {
//  const response = await get({path: 'users/account-details', router: router});
//  if (response.ok) {
//    const data = await response.json();
//    if ('username' in data && 'email' in data) {
//      return {username: data.username, email: data.email};
//    }
//  }
//  return {username: 'Fix me', email: 'Fix me'};
//}

export function ManageAccount() {
  return (
    <>
      <AccountForm path="users/change-username">
        <div>
          <label htmlFor="new-username">New Username:</label>
          <input type="text" id="new-username" name="new-username" required />
        </div>
        <button type="submit">Update Username</button>
      </AccountForm>
      <AccountForm path="users/change-email">
        <div>
          <label htmlFor="new-email">New Email:</label>
          <input type="text" id="new-email" name="new-email" required />
        </div>
        <button type="submit">Update Email</button>
      </AccountForm>
      <AccountForm path="users/change-password">
        <div>
          <label htmlFor="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" required />
        </div>
        <button type="submit">Update Password</button>
      </AccountForm>
    </>
  );
}
