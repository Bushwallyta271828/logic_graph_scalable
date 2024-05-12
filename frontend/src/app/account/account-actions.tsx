'use server';

import { fetchWrapper } from '@/app/_lib/api';
import { cookies } from 'next/headers';

export async function submitSignUpForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-up', options: {method: 'POST', body: formData}});
  if (response.ok) {
    const formUsername = formData.get('username');
    if (typeof formUsername === 'string') {
      cookies().set('username', formUsername, {httpOnly: true});
    } else {throw new Error("formData.get('username') isn't a string");}
  }
  console.log(response);
}

export async function submitSignInForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});
  console.log(response);
}

export async function submitChangePasswordForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});
  console.log(response);
}
