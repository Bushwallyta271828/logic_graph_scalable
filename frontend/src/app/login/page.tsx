import { LoginForm } from '@/app/login/login-form';
import { SignUpForm } from '@/app/login/sign-up-form';

export default function Login() {
  //async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //  'use server';
  //  event.preventDefault();
  //
  //  const formData = new FormData(event.currentTarget);
  //  console.log(formData);
  //}




  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    'use server';
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username'); // Get the username from the form
    const password = formData.get('password'); // Get the password from the form
  
    console.log('Username:', username);
    console.log('Password:', password);
  
  };

  return (
    <LoginForm handleSubmit={handleSubmit} />
    //<form onSubmit={handleSubmit}>
    //  <input type="text" name="name" />
    //  <button type="submit">Submit</button>
    //</form>
  );
}
