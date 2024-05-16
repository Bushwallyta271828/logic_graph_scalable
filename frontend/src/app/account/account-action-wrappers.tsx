'use client';

import { NextRouter } from 'next/router';
import { get, postForm, postJSON } from '@/app/_api/api';


export async function submitSignInForm({formData, router}: {formData: FormData, router: NextRouter}) {
  const response = await postForm({path: 'users/sign-in', router: router, formData: formData});
  if (!('error' in response)) {
    router = useRouter();
    router.push('/debates');
  }
}

export async function submitCreateAccountForm({formData, router}: {formData: FormData, router: NextRouter}) {
  const response = await postForm({path: 'users/create-account', router: router, formData: formData});
  if (!('error' in response)) {
    router = useRouter();
    router.push('/debates');
  }
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
