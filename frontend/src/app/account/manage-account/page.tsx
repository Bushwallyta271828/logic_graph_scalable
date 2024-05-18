import { AccountForm } from '@/app/account/account-form';
import { DisplayUsername } from '@/app/account/manage-account/display-username';
import { PasswordInput } from '@/app/account/password-input';


export default function ManageAccount() {
  return (
    <>
      <AccountForm path="users/change-username" redirectSignIn={true} usernameField="new-username">
        <DisplayUsername />
        <div>
          <label htmlFor="new-username">New Username:</label>
          <input type="text" id="new-username" name="new-username" autoComplete="off" required />
        </div>
        <button type="submit">Update Username</button>
      </AccountForm>
      <AccountForm path="users/change-password" redirectSignIn={true}>
        <div>
          <label htmlFor="new-password">New Password:</label>
	  <PasswordInput name="new-password" autocomplete={false} />
        </div>
        <button type="submit">Update Password</button>
      </AccountForm>
    </>
  );
}
