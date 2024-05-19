import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';

export default function SignIn() {
  return (
    <div>
      <p className="text-white text-lg font-bold">Sign In</p>
      <AccountForm path="users/sign-in" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
        <div className="flex flex-row items-baseline">
          <label htmlFor="username" className="w-20 text-white text-sm">Username:</label>
          <UsernameInput name="username" autocomplete={true} />
        </div>
        <div className="flex flex-row items-baseline">
          <label htmlFor="password" className="w-20 text-white text-sm">Password:</label>
          <PasswordInput name="password" autocomplete={true} />
        </div>
        <button type="submit" className="bg-bright-neutral hover:bg-dark-neutral text-white text-sm px-2 py-1 rounded-md">Submit</button>
      </AccountForm>
    </div>
  );
}
