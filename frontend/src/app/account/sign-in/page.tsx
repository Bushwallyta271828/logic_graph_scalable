import { AccountForm } from '@/app/account/account-form';

export default function SignIn() {
  //AccountForm is client-side
  //redirect="/debates" ensures that AccountButton gets refreshed
  //if the sign in is successful.
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
