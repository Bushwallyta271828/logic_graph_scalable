import { LoginForm } from '@/app/login/login-form';
import { SignUpForm } from '@/app/login/sign-up-form';

export default function Login() {
  //I've put everything inside this component to get around server side / client side restrictions.
  return (
    <div>
      <LoginForm />
      <SignUpForm />
    </div>
  );
}
