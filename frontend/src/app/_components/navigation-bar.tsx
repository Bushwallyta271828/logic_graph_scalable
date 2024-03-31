'use client';

import Link from 'next/link';
import { useClaimsContext } from '@/app/_contexts/claims-context';

export function NavigationBar() {
  const { claimLookup, claimIDs, setClaimLookup, setClaimIDs } = useClaimsContext();

  return (
    <nav className="bg-zinc-900 text-white px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <p>Hi!</p>
        </div>
        <div className="flex gap-8">
          <div className="text-lg font-bold">
            <Link href="/">Claims</Link>
          </div>
          <div className="text-lg font-bold">
            <Link href="/">Analysis</Link>
          </div>
          <div className="text-lg font-bold">
            <Link href="/documentation">Documentation</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
