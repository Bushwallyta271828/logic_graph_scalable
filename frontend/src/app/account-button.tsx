'use client';

import Link from 'next/link';
import { useUserContext } from '@/app/_user_context/user-context';

export function AccountButton() {
  const { user } = useUserContext();

  if (user === null) {
    return (
      <Link href="/account/sign-up">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Account
        </button>
      </Link>
    );
  } else {
    return (
      <Link href="/">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Account
        </button>
      </Link>
    );
  }
}
