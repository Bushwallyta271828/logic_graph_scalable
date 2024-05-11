import { fetchWrapper } from '@/app/_lib/api';

export default function SignUp() {
  async function submitSignUpForm(formData: FormData) {
    'use server';
    const response = await fetchWrapper(
      {path: 'users/sign-up', options: {method: 'POST', body: formData}});
    console.log(response);
  }

  return (
    <form action={submitSignUpForm}>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
