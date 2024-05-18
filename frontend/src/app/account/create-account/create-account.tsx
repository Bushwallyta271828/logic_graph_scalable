'use client';

import { useAccountContext } from '@/app/_account_context/account-context';
import { AccountForm } from '@/app/account/account-form';

export function CreateAccount() {
  return (
    <AccountForm path="users/create-account" redirectOrRefresh="/debates">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Create Account</button>
    </AccountForm>
  );
}
