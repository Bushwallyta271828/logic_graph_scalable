import { fetchWrapper } from '@/app/_lib/api';

export default function ChangePassword() {
  async function submitSignInForm(formData: FormData) {
    'use server';
    const response = await fetchWrapper(
      {path: 'users/sign-in', options: {method: 'POST', body: formData}});
    console.log(response);
  }

  return (
    <form action={submitSignInForm}>
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
