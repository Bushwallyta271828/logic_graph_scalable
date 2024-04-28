import Link from 'next/link';
import { DebateName } from '@/app/users/[user]/debate-name';

export default function DebateSelectionNavbar({children, params}:
  Readonly<{children: React.ReactNode, params: {user: string}}>) {
  return (
    <>
      <nav className="bg-dark-neutral px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <Link href={"/users/" + params.user}>
              <button className="text-white text-lg font-bold bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                Debates
              </button>
            </Link>
            <DebateName />
          </div>
          <div className="text-white text-lg font-bold flex gap-4">
            <Link href="/">
              <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                Account
              </button>
            </Link>
            <Link href="/documentation">
              <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                Documentation
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
