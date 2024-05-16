import {
  submitChangeUsernameForm,
  submitChangeEmailForm,
  submitChangePasswordForm,
} from '@/app/account/account-action-wrappers';

export function ManageAccount() {
  return (
    <>
      <form action={submitChangeUsernameForm}>
        <div>
          <label htmlFor="new-username">New Username:</label>
          <input type="text" id="new-username" name="new-username" required />
        </div>
        <button type="submit">Update Username</button>
      </form>
      <form action={submitChangeEmailForm}>
        <div>
          <label htmlFor="new-email">New Email:</label>
          <input type="text" id="new-email" name="new-email" required />
        </div>
        <button type="submit">Update Email</button>
      </form>
      <form action={submitChangePasswordForm}>
        <div>
          <label htmlFor="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" required />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </>
  );
}
