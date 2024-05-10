export default function Login() {
  async function submitLoginForm(formData: FormData) {
    'use server';
    const username = formData.get('username');
    const password = formData.get('password');
  
    console.log('Username:', username);
    console.log('Password:', password);
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
