'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { get, postForm, postJSON } from '@/app/api';

export async function isAuthenticated(): Promise<boolean | null> {
  const response = await get({path: 'users/authenticated'});
  if (response.ok) {
    const data = await response.json();
    if ('authenticated' in data) {
      return data.authenticated;
    }
  }
  return null;
}

export async function submitSignInForm(formData: FormData) {
  const response = await postForm({path: 'users/sign-in', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitCreateAccountForm(formData: FormData) {
  const response = await postForm({path: 'users/create-account', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}

export async function signOut() {
  await postJSON({path: 'users/sign-out'});
  (await cookies()).getAll().map((cookie) =>
    await (await cookies()).delete(cookie.name));
  revalidatePath('/');
  redirect('/');
}

export async function deleteAccount() {
  await postJSON({path: 'users/delete-account'});
  (await cookies()).getAll().map((cookie) =>
    await (await cookies()).delete(cookie.name));
  revalidatePath('/');
  redirect('/');
}

export async function getAccountDetails(): Promise<{username: string, email: string}> {
  const response = await get({path: 'users/account-details'});
  if (response.ok) {
    const data = await response.json();
    if ('username' in data && 'email' in data) {
      return {username: data.username, email: data.email};
    }
  }
}

export async function submitChangeUsernameForm(formData: FormData) {
  const response = await postForm({path: 'users/change-username', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangeEmailForm(formData: FormData) {
  const response = await postForm({path: 'users/change-email', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitChangePasswordForm(formData: FormData) {
  const response = await postForm({path: 'users/change-password', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}
