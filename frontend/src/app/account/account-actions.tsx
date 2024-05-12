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
    const formEmail = formData.get('email');
    if (typeof formUsername === 'string' && typeof formEmail === 'string') {
      cookies().set('username', formUsername, {httpOnly: false});
      cookies().set('hasEmail', (formEmail.trim() !== "").toString(), {httpOnly: false});
    } else {throw new Error("formData username/email aren't both strings");}
  }

  revalidatePath('/');
  redirect('/debates');
}

export async function submitSignInForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});

  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangeUsernameForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});

  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangeEmailForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});

  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangePasswordForm(formData: FormData) {
  const response = await fetchWrapper(
    {path: 'users/sign-in', options: {method: 'POST', body: formData}});

  revalidatePath('/');
  redirect('/debates');
}

export async function logOut() {
  if (cookies().has('csrftoken')) {cookies().delete('csrftoken');}
  if (cookies().has('sessionid')) {cookies().delete('sessionid');}
  if (cookies().has('username')) {cookies().delete('username');}
  if (cookies().has('email')) {cookies().delete('email');}
  revalidatePath('/');
  redirect('/');
}
