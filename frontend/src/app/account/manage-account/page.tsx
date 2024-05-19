import { FormCard } from '@/app/account/form-card';
import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';
import { DisplayUsername } from '@/app/account/manage-account/display-username';


export default function ManageAccount() {
  return (
    <FormCard>
      <DisplayUsername />
      <p className="text-white text-lg font-bold mb-4 text-center">Change Username</p>
      <AccountForm path="users/change-username" redirectSignIn={true} usernameField="new-username">
        <label htmlFor="new-username" className="text-white text-sm">New Username:</label>
        <UsernameInput name="new-username" autocomplete={false} />
        <button type="submit" className="bg-medium-neutral hover:bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">
          Update Username
        </button>
      </AccountForm>
      <p className="text-white text-lg font-bold mb-4 text-center">Change Password</p>
      <AccountForm path="users/change-password" redirectSignIn={true}>
        <label htmlFor="new-password" className="text-white text-sm">New Password:</label>
        <PasswordInput name="new-password" autocomplete={false} />
        <button type="submit" className="bg-medium-neutral hover:bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">
          Update Password
        </button>
      </AccountForm>
    </FormCard>
  );
}
