'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export function DebateLinks() {
  const params = useParams<{ user: string, debate: string }>();

  return (
    <div className="text-white text-lg font-bold flex gap-4">
      <Link href={`/users/${user}/${debate}`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Claims
        </button>
      </Link>
      <Link href={`/users/${user}/${debate}/sampling`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Sampling
        </button>
      </Link>
      <Link href={`/users/${user}/${debate}/ideologies`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Ideologies
        </button>
      </Link>
      <Link href={`/user/${user}/${debate}/dependencies`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Dependencies
        </button>
      </Link>
    </div>
  );
}
