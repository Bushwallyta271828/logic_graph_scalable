import { FormCard } from '@/app/account/form-card';
import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';


export default function SignIn() {
  return (
    <FormCard>
      <p className="text-white text-lg font-bold text-center">Welcome Back!</p>
      <AccountForm path="users/sign-in" redirectSignIn={false} afterSuccess="/debates" usernameField="username">
        <label htmlFor="username" className="text-white text-sm">Username:</label>
        <UsernameInput name="username" autocomplete={true} />
        <label htmlFor="password" className="text-white text-sm">Password:</label>
        <PasswordInput name="password" autocomplete={true} />
        <button type="submit" className="bg-medium-neutral hover:bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">
          Sign In
        </button>
      </AccountForm>
    </FormCard>
  );
}
