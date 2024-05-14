'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchWrapper } from '@/app/fetch-wrapper';

export async function getUserData(): Promise<{username: string, email: string} | 'Signed out'> {
  const response = await fetchWrapper({path: 'users/get-username-email', options: {}});
  if (response.ok) {
    const data = await response.json();
    if ('username' in data && 'email' in data) {
      return {username: data.username, email: data.email};
    }
  }
  if (response.status === 401) {return 'Signed out' as const;}
  throw new Error('Invalid response');
}

export async function submitSignUpForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-up', options: {method: 'POST', body: formDataToJSON(formData)}});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitSignInForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formDataToJSON(formData)}});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangeUsernameForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/change-username', options: {method: 'POST', body: await formDataToJSON(formData)}});

  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangeEmailForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/change-email', options: {method: 'POST', body: await formDataToJSON(formData)}});

  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangePasswordForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/change-password', options: {method: 'POST', body: await formDataToJSON(formData)}});

  revalidatePath('/');
  redirect('/debates');
}

export async function logOut() {
  //TODO: delete all cookies!
  if (cookies().has('sessionid')) {await (await cookies()).delete('sessionid');}
  revalidatePath('/');
  redirect('/');
}
