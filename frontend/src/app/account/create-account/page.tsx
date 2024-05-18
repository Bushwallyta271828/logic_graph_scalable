import { AccountForm } from '@/app/account/account-form';


export default function CreateAccount() {
  return (
    <AccountForm path="users/create-account" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
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
