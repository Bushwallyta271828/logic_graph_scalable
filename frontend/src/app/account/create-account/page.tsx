import { AccountForm } from '@/app/account/account-form';
import { PasswordInput } from '@/app/account/password-input';


export default function CreateAccount() {
  return (
    <AccountForm path="users/create-account" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" autoComplete="off" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <PasswordInput name="password" autocomplete={false} />
      </div>
      <button type="submit">Create Account</button>
    </AccountForm>
  );
}
