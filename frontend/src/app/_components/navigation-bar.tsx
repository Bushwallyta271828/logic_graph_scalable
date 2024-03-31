import Link from 'next/link';
import { AddClaimButton } from '@/app/_components/add-claim-button';

export function NavigationBar() {
  return (
    <nav className="bg-zinc-900 text-white text-lg font-bold px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <AddClaimButton />
        <div className="flex gap-4">
          <Link href="/">
            <button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
              Claims
            </button>
          </Link>
          <Link href="/analysis">
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
