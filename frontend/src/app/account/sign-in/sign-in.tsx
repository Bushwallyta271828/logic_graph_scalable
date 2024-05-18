'ues client';

import { useAccountContext } from '@/app/_account_context/account-context';
import { AccountForm } from '@/app/account/account-form';

export default function SignIn() {
  const { setAccount } = useAccountContext();

  const afterSuccess = (formData: FormData) => {
    const username = formData.get('username');
    if (typeof username === 'string')
      {setAccount({status: 'signed in' as const, username: username});}
  };

  return (
    <AccountForm path="users/sign-in" redirectSignIn={false} afterSuccess={afterSuccess} redirectOnSuccess="/debates">
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
