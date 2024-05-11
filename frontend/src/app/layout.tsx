import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Menu } from '@headlessui/react';
import { UserContextProvider } from '@/app/_user_context/user-context';
import { Navbar } from '@/app/navbar';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const usernameCookie = cookies().get('username');
  const username = (usernameCookie !== undefined && typeof usernameCookie.value === 'string')
    ? usernameCookie.value : null;

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
              <Menu>
                <Menu.Button>
                  {({ open }) =>
                    open
                      ? (<p className="px-2 py-1 rounded-md bg-medium-neutral hover:bg-bright-neutral">Account</p>)
                      : (<p className="px-2 py-1 rounded-md bg-transparent hover:bg-medium-neutral">Account</p>)
                  }
                </Menu.Button>
                <Menu.Items className="absolute w-36 origin-top-right z-30 bg-transparent outline outline-1 outline-white rounded-md shadow-xl text-sm font-normal">
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/sign-in">
                          <a className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-text' : 'bg-medium-text'}`}>
                            Sign In
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/sign-up">
                          <a className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-constraint' : 'bg-medium-constraint'}`}>
                            Sign Up
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
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
