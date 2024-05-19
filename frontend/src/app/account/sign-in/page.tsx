import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/forms-input';

export default function SignIn() {
  return (
    <div>
      <p>Sign In</p>
      <AccountForm path="users/sign-in" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
        <div>
          <label htmlFor="username">Username:</label>
          <UsernameInput name="username" autocomplete={true} />
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
