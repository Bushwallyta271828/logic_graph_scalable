import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';


export default function SignIn() {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <p className="text-white text-lg font-bold mb-4 text-center">Welcome Back!</p>
        <AccountForm path="users/sign-in" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-white text-sm mb-2">Username:</label>
            <UsernameInput name="username" autocomplete={true} />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-white text-sm mb-2">Password:</label>
            <PasswordInput name="password" autocomplete={true} />
          </div>
          <button type="submit" className="bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">Sign In</button>
        </AccountForm>
      </div>
    </div>
  );
}
