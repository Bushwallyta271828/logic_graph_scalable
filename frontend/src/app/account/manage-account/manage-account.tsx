import {
  submitChangeUsernameForm,
  submitChangeEmailForm,
  submitChangePasswordForm,
} from '@/app/account/account-action-wrappers';



export async function getAccountDetails({router}: {router: NextRouter}) {
  const response = await get({path: 'users/account-details', router: router});
  if (response.ok) {
    const data = await response.json();
    if ('username' in data && 'email' in data) {
      return {username: data.username, email: data.email};
    }
  }
  return {username: 'Fix me', email: 'Fix me'};
}

export async function submitChangeUsernameForm({formData, router}: {formData: FormData, router: NextRouter}) {
  const response = await postForm({path: 'users/change-username', formData: formData, router: router});
}

export async function submitChangeEmailForm({formData, router}: {formData: FormData, router: NextRouter}) {
  const response = await postForm({path: 'users/change-email', formData: formData, router: router});
}

export async function submitChangePasswordForm({formData, router}: {formData: FormData, router: NextRouter}) {
  const response = await postForm({path: 'users/change-password', formData: formData, router: router});
}





export function ManageAccount() {
  return (
    <>
      <form action={submitChangeUsernameForm}>
        <div>
          <label htmlFor="new-username">New Username:</label>
          <input type="text" id="new-username" name="new-username" required />
        </div>
        <button type="submit">Update Username</button>
      </form>
      <form action={submitChangeEmailForm}>
        <div>
          <label htmlFor="new-email">New Email:</label>
          <input type="text" id="new-email" name="new-email" required />
        </div>
        <button type="submit">Update Email</button>
      </form>
      <form action={submitChangePasswordForm}>
        <div>
          <label htmlFor="new-password">New Password:</label>
          <input type="password" id="new-password" name="new-password" required />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </>
  );
}
