import { AccountForm } from '@/app/account/account-form';

export default function CreateAccount() {
  //AccountForm is client-side
  //redirect="/debates" ensures that AccountButton gets refreshed
  //if the account creation is successful.
  return (
    <AccountForm path="users/create-account" redirectOrRefresh="/debates">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Create Account</button>
    </AccountForm>
  );
}
