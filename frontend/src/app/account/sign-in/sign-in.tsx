'use client';

import { submitSignInForm } from '@/app/account/account-action-wrappers';

export function SignIn() {
  return (
    <form action={submitSignInForm}>
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
  );
}
