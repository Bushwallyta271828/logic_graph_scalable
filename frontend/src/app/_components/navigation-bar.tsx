import Link from 'next/link';
import { NewClaimButton } from '@/app/_components/new-claim-button';

export function NavigationBar() {
  return (
    <nav className="bg-neutral-900 text-white text-lg font-bold px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <NewClaimButton />
        <div className="flex gap-4">
          <Link href="/">
            <button className="bg-transparent hover:bg-neutral-700 px-2 py-1 rounded">
              Claims
            </button>
          </Link>
          <Link href="/analysis">
            <button className="bg-transparent hover:bg-neutral-700 px-2 py-1 rounded">
              Analysis
            </button>
          </Link>
          <Link href="/documentation">
            <button className="bg-transparent hover:bg-neutral-700 px-2 py-1 rounded">
              Documentation
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
