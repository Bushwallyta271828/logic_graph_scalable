'use client';

import { useRouter } from 'next/navigation';
import { get, postForm, postJSON } from '@/app/_api/api';


export async function submitSignInForm(formData: FormData) {
  const response = await postForm({path: 'users/sign-in', formData: formData});
  router = useRouter();
  router.push('/debates');
  router.refresh(); //Will refresh AccountButton
}

export async function submitCreateAccountForm(formData: FormData) {
  const response = await postForm({path: 'users/create-account', formData: formData});
  router = useRouter();
  router.push('/debates');
  router.refresh(); //Will refresh AccountButton
}

export async function signOut() {
  await postJSON({path: 'users/sign-out'});
  await (await (await cookies()).getAll()).map(clearCookie);
  router = useRouter();
  router.push('/');
  router.refresh(); //Will refresh AccountButton
}

export async function deleteAccount() {
  await postJSON({path: 'users/delete-account'});
  await (await (await cookies()).getAll()).map(clearCookie);
  router = useRouter();
  router.push('/');
  router.refresh(); //Will refresh AccountButton
}

export async function getAccountDetails(): Promise<{username: string, email: string}> {
  const response = await get({path: 'users/account-details'});
  if (response.ok) {
    const data = await response.json();
    if ('username' in data && 'email' in data) {
      return {username: data.username, email: data.email};
    }
  }
  return {username: 'Fix me', email: 'Fix me'};
}

export async function submitChangeUsernameForm(formData: FormData) {
  const response = await postForm({path: 'users/change-username', formData: formData});
}

export async function submitChangeEmailForm(formData: FormData) {
  const response = await postForm({path: 'users/change-email', formData: formData});
}

export async function submitChangePasswordForm(formData: FormData) {
  const response = await postForm({path: 'users/change-password', formData: formData});
}
