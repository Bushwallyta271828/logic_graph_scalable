import { FormCard } from '@/app/account/form-card';
import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';
import { DisplayUsername } from '@/app/account/manage-account/display-username';


export default function ManageAccount() {
  return (
    <FormCard>
      <p className="text-white text-lg font-bold text-center">Username</p>
      <DisplayUsername />
      <AccountForm path="users/change-username" redirectSignIn={true} usernameField="new-username">
        <label htmlFor="new-username" className="text-white text-sm">Change Username:</label>
        <UsernameInput name="new-username" autocomplete={false} />
        <button type="submit" className="bg-medium-neutral hover:bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">
          Update Username
        </button>
      </AccountForm>
      <p className="text-white text-lg font-bold text-center">Password</p>
      <AccountForm path="users/change-password" redirectSignIn={true}>
        <label htmlFor="new-password" className="text-white text-sm">Change Password:</label>
        <PasswordInput name="new-password" autocomplete={false} />
        <label htmlFor="confirm-new-password" className="text-white text-sm">Confirm New Password:</label>
        <PasswordInput name="confirm-new-password" autocomplete={false} />
        <button type="submit" className="bg-medium-neutral hover:bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">
          Update Password
        </button>
      </AccountForm>
    </FormCard>
  );
}
