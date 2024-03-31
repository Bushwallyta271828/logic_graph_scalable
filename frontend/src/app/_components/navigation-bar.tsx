'use client';

import Link from 'next/link';
import { useClaimsContext } from '@/app/_contexts/claims-context';

export function NavigationBar() {
  const { claimLookup, claimIDs, setClaimLookup, setClaimIDs } = useClaimsContext();

  return (
    <nav className="bg-zinc-900 text-white text-lg font-bold px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
          <p>New Claim</p>
        </button>
        <div className="flex gap-4">
          <Link href="/">
            <button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
              Claims
            </button>
          </Link>
          <Link href="/">
            <button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
              Analysis
            </button>
          </Link>
          <Link href="/documentation">
            <button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
              Documentation
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
