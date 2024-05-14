'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { get, postForm, postJSON } from '@/app/api';

export async function getUserData(): Promise<{username: string, email: string} | 'Signed out'> {
  const response = await get({path: 'users/get-username-email', displayErrors: false});
  if (response.ok) {
    const data = await response.json();
    if ('username' in data && 'email' in data) {
      return {username: data.username, email: data.email};
    }
  }
  if (response.status === 401) {return 'Signed out' as const;}
  //COME BACK!
}

export async function submitSignUpForm(formData: FormData) {
  const response = await postForm({path: 'users/sign-up', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}

export async function submitSignInForm(formData: FormData) {
  const response = await postForm({path: 'users/sign-in', formData: formData});
  revalidatePath('/');
  redirect('/debates');
}

export async function signOut() {
  await postJSON({path: 'users/sign-out', data: "{}", displayErrors: false});
  if (cookies().has('sessionid')) {await (await cookies()).delete('sessionid');}
  revalidatePath('/');
  redirect('/');
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
