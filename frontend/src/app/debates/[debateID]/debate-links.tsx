'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export function DebateLinks() {
  const { debateID } = useParams<{ debateID: string }>();

  return (
    <div className="text-white text-lg font-bold flex gap-4">
      <Link href={`/debates/${debateID}`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Claims
        </button>
      </Link>
      <Link href={`/debates/${debateID}/sampling`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Sampling
        </button>
      </Link>
      <Link href={`/debates/${debateID}/ideologies`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Ideologies
        </button>
      </Link>
      <Link href={`/debates/${debateID}/dependencies`}>
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Dependencies
        </button>
      </Link>
    </div>
  );
}
