import { submitCreateAccountForm } from '@/app/account/account-action-wrappers';



export async function submitCreateAccountForm({formData, router}: {formData: FormData, router: NextRouter}) {
  const response = await postForm({path: 'users/create-account', formData: formData, router: router});
  if (!('error' in response)) {
    router = useRouter();
    router.push('/debates');
  }
}


export function CreateAccount() {
  return (
    <form action={submitCreateAccountForm}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}
