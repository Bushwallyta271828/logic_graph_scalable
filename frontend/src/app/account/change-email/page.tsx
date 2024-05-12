import { submitChangeEmailForm } from '@/app/account/account-actions';

export default function ChangeEmail() {
  return (
    <form action={submitChangeEmailForm}>
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
