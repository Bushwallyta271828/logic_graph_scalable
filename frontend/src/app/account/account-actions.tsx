'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchWrapper } from '@/app/_lib/api';

export async function submitSignUpForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-up', options: {method: 'POST', body: formData}});
  if (response.ok) {
    const formUsername = formData.get('username');
    if (typeof formUsername === 'string') {
      cookies().set('username', formUsername, {httpOnly: true});
    } else {throw new Error("formData.get('username') isn't a string");}
  }

  revalidatePath('/debates');
  redirect('/debates');
}

export async function submitSignInForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});

  revalidatePath('/debates');
  redirect('/debates');
}

export async function submitChangePasswordForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});

  revalidatePath('/debates');
  redirect('/debates');
}

export async function logOut() {
  console.log('Fix me');
  
  revalidatePath('/');
  redirect('/');
}
