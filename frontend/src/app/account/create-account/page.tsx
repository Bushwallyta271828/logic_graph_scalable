import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';


export default function CreateAccount() {
  return (
    <AccountForm path="users/create-account" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
      <div>
        <label htmlFor="username">Username:</label>
        <UsernameInput name="username" autocomplete={false} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <PasswordInput name="password" autocomplete={false} />
      </div>
      <button type="submit">Create Account</button>
    </AccountForm>
  );
}
