import { post } from '@/app/_lib/api';

export default function Login() {
  async function submitLoginForm(formData: FormData) {
    'use server';
    const data = {username: formData.get('username'), password: formData.get('password')};
    post({path: 'users/', data: data});
  }

  return (
    <form action={submitLoginForm}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
