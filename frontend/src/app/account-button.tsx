'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { getCookie } from 'cookies-next';
import { logOut } from '@/app/account/account-actions';

function NoUsernameMenuItems() {
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link href="/account/sign-in">
            <a className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}>
              Sign In
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="/account/sign-up">
            <a className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}>
              Sign Up
            </a>
          </Link>
        )}
      </Menu.Item>
    </>
  );
}

function UsernameMenuItems({username}: {username: string}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link href="/account/change-password">
            <a className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}>
              Change Password
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a
            className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}
            onClick={() => {startTransition(logOut);}}>
            Log Out {username}
          </a>
        )}
      </Menu.Item>
    </>
  );
}

export function AccountButton() {
  const testUsername = getCookie('username');
  console.log(testUsername);
  const username: string | null = "generic username";

  return (
    <div className="text-white text-lg font-bold relative">
      <Menu>
        <Menu.Button>
          {({ open }) =>
            open
              ? (<p className="px-2 py-1 rounded-md bg-medium-neutral hover:bg-bright-neutral">Account</p>)
              : (<p className="px-2 py-1 rounded-md bg-transparent hover:bg-medium-neutral">Account</p>)
          }
        </Menu.Button>
        <Menu.Items className="absolute w-36 origin-top-right z-30 bg-transparent outline outline-1 outline-white rounded-md shadow-xl text-sm font-normal">
          { (username === null) ?
            <NoUsernameMenuItems /> :
            <UsernameMenuItems username={username} />
          }
        </Menu.Items>
      </Menu>
    </div>
  );
}
