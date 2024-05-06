import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { UserContextProvider } from '@/app/_user_context/user-context';
import { Navbar } from '@/app/navbar';
import { LoginLogoutButton } from '@/app/login-logout-button';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <UserContextProvider>
      <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
        <body className="bg-medium-neutral min-h-screen">
          <Navbar border={false}>
            <div className="text-white text-lg font-bold flex gap-4">
              <Link href="/">
                <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                  LogicGraph
                </button>
              </Link>
            </div>
            <div className="text-white text-lg font-bold flex gap-4">
              <LoginLogoutButton />
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
