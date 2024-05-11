'use client';

import Link from 'next/link';
import { Menu } from '@headlessui/react';

export function AccountButton({username}: {username: string | null}) {
  return (
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
  );
  //if (username === null) {
  //  return (
  //    <Link href="/account/sign-up">
  //      <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
  //        Account
  //      </button>
  //    </Link>
  //  );
  //} else {
  //  return (
  //    <Link href="/">
  //      <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
  //        Account
  //      </button>
  //    </Link>
  //  );
  //}
}
