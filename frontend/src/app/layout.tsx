import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/app/navbar';
import { DebateName } from '@/app/users/[user]/debate-name';
import './globals.css';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
      <body className="bg-medium-neutral min-h-screen">
        <Navbar border={false}>
          <div className="flex gap-4 items-baseline">
            <Link href="/">
              <button className="text-white text-lg font-bold bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                LogicGraph
              </button>
            </Link>
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
                {`Sign out ${params.user}`}
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
      </body>
    </html>
  );
}
