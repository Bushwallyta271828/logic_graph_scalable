import { submitChangePasswordForm } from '@/app/account/account-actions';

export default function ChangePassword() {
  return (
    <form action={submitChangePasswordForm}>
      <div>
        <label htmlFor="username">FIX ME Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">FIX ME Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
}
