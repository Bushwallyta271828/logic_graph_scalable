import { fetchWrapper } from '@/app/_lib/api';
import { cookies } from 'next/headers';

export default function SignUp() {
  async function submitSignUpForm(formData: FormData) {
    'use server';
    const response = await fetchWrapper(
      {path: 'users/sign-up', options: {method: 'POST', body: formData}});
    const attemptSessionIdCookie = cookies().get('sessionid');
    if (attemptSessionIdCookie !== undefined) {
      const formUsername = formData.get('username');
      if (typeof formUsername === 'string') {
        cookies().set('username', formUsername, {
          expires: attemptSessionIdCookie.expires,
          maxAge: attemptSessionIdCookie.maxAge,
          httpOnly: false,
        });
      } else {throw new Error("formData.get('username') isn't a string");}
    }
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
