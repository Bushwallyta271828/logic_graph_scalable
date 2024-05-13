'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchWrapper } from '@/app/_lib/fetch-wrapper';

async function formDataToJSON(formData: FormData) {
  let formDataObj: Record<string, string> = {};
  formData.forEach((value, key) => {
    formDataObj[key as string] = value as string;
  });
  return JSON.stringify(formDataObj);
}

async function processAuthenticationForm({formData, path}: {formData: FormData, path: string}) {
  const response = await fetchWrapper(
    {path: path, options: {method: 'POST', body: await formDataToJSON(formData)}});
  if (response.ok) {
    const formUsername = formData.get('username');
    if (typeof formUsername === 'string') {
      await (await cookies()).set('username', formUsername, {httpOnly: false});
    } else {throw new Error("formData.get('username') isn't a string");}
  }
}

export async function submitSignUpForm(formData: FormData) {
  await processAuthenticationForm({formData: formData, path: 'users/sign-up'});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitSignInForm(formData: FormData) {
  await processAuthenticationForm({formData: formData, path: 'users/sign-in'});
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
  if (cookies().has('sessionid')) {cookies().delete('sessionid');}
  if (cookies().has('username')) {cookies().delete('username');}
  revalidatePath('/');
  redirect('/');
}
