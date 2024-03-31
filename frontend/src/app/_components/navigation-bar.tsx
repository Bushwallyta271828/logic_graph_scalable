'use client';

import Link from 'next/link';
import { useClaimsContext } from '@/app/_contexts/claims-context';

export function NavigationBar() {
  const { claimLookup, claimIDs, setClaimLookup, setClaimIDs } = useClaimsContext();

  return (
    <nav className="bg-zinc-900 text-white text-lg font-bold px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <button className="bg-transparent hover:bg-zinc-700 py-2 px-2 rounded">
          <p>New Claim</p>
        </button>
        <div className="flex gap-4">
          <button className="bg-transparent hover:bg-zinc-700 py-2 px-2 rounded">
            <Link href="/">Claims</Link>
          </button>
          <button className="bg-transparent hover:bg-zinc-700 py-2 px-2 rounded">
            <Link href="/">Analysis</Link>
          </button>
          <button className="bg-transparent hover:bg-zinc-700 py-2 px-2 rounded">
            <Link href="/documentation">Documentation</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
