'use client';

import { useUserContext } from '@/app/_user_context/user-context';

export function LoginLogoutButton() {
  const { user } = useUserContext();

  if (user === null) {
    return (
      <Link href="/login">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Login
        </button>
      </Link>
    );
  } else {
    return (
      <Link href="/">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Logout
        </button>
      </Link>
    );
  }
}
