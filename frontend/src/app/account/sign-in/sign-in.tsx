'use client';

import { AccountForm } from '@/app/account/account-form';


export function SignIn() {
  return (
    <AccountForm path="users/sign-in" redirect="/debates">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Sign In</button>
    </AccountForm>
  );
}
