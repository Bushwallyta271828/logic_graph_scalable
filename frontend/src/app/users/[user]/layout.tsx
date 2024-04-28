import Link from 'next/link';
import { Navbar } from '@/app/navbar';
import { DebateName } from '@/app/users/[user]/debate-name';

export default function DebateSelectionNavbar({children, params}:
  Readonly<{children: React.ReactNode, params: {user: string}}>) {
  return (
    <>
      <Navbar border={false}>
        <div className="flex gap-8 items-baseline">
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
      </Navbar>
      {children}
    </>
  );
}
