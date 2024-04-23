import Link from 'next/link';

export function DebateLinks() {
  return (
    <div className="text-white text-lg font-bold flex gap-4">
      <Link href="/">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Claims
        </button>
      </Link>
      <Link href="/sampling">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Sampling
        </button>
      </Link>
      <Link href="/ideologies">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Ideologies
        </button>
      </Link>
      <Link href="/dependencies">
        <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
          Dependencies
        </button>
      </Link>
    </div>
  );
}
