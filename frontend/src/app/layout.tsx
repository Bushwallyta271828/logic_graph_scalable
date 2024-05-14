import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { UserContextProvider } from '@/app/_user_context/user-context';
import { Navbar } from '@/app/navbar';
import { getUserData } from '@/app/account/account-actions';
import { AccountButton } from '@/app/account-button';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const signedOut = ('Signed out' === await getUserData());

  return (
    <UserContextProvider>
      <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
        <body className="bg-medium-neutral min-h-screen">
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
              <p className="text-white px-2 py-1">
                debate_name_goes_here
              </p>
            </div>
            <div className="text-white text-lg font-bold flex gap-4">
              <AccountButton signedOut={signedOut} />
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
    </UserContextProvider>
  );
}
