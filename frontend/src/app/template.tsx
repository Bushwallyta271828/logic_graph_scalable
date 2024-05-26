import Link from 'next/link';
import { Navbar } from '@/app/navbar';
import { DebateName } from '@/app/debate-name';
import { AccountButton } from '@/app/account-button';


export default function RootTemplate({children}: Readonly<{children: React.ReactNode}>) {
  return (
        <div className="grid grid-rows-[auto_1fr] min-h-screen">
          <Navbar border={false}>
            <div className="flex gap-4 items-baseline">
              <Link href="/">
                <button className="text-white text-lg font-bold bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                  LogicGraph
                </button>
              </Link>
              <Link href="/debates">
                <button className="text-white text-lg font-bold bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                  Debates
                </button>
              </Link>
              <DebateName />
            </div>
            <div className="text-white text-lg font-bold flex gap-4">
              <AccountButton />
              <Link href="/documentation">
                <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                  Documentation
                </button>
              </Link>
            </div>
          </Navbar>
          <div>
            {children}
          </div>
        </div>
  );
}
