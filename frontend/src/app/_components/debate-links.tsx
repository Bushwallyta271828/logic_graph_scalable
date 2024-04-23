import Link from 'next/link';

export function DebateLinks() {
  return (
    <div className="text-white text-lg font-bold flex gap-4">
      <Link href="/">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Claims
        </button>
      </Link>
      <Link href="/analysis">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Analysis
        </button>
      </Link>
      <Link href="/documentation">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Documentation
        </button>
      </Link>
    </div>
  );
}
