import { FormCard } from '@/app/account/form-card';
import { AccountForm } from '@/app/account/account-form';
import { UsernameInput, PasswordInput } from '@/app/account/form-inputs';


export default function CreateAccount() {
  return (
    <FormCard>
      <p className="text-white text-lg font-bold mb-4 text-center">Welcome to LogicGraph!</p>
      <AccountForm path="users/create-account" redirectSignIn={false} usernameField="username" redirectOnSuccess="/debates">
        <label htmlFor="username" className="text-white text-sm">Username:</label>
        <UsernameInput name="username" autocomplete={false} />
        <label htmlFor="password" className="text-white text-sm">Password:</label>
        <PasswordInput name="password" autocomplete={false} />
        <button type="submit" className="bg-medium-neutral hover:bg-bright-neutral text-white text-sm px-4 py-2 rounded-md w-full">
          Create Account
        </button>
      </AccountForm>
    </FormCard>
  );
}
