import { AccountForm } from '@/app/account/account-form';
import { PasswordInput } from '@/app/account/password-input';

export default function SignIn() {
  return (
    <div>
      <p>Sign In</p>
      <AccountForm path="users/sign-in" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" autoComplete="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <PasswordInput name="password" autocomplete={true} />
        </div>
        <button type="submit">Submit</button>
      </AccountForm>
    </div>
  );
}
