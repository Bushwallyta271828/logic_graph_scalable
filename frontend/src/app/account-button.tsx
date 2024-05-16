'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { postJSON } from '@/app/_api/api';
import { isAuthenticated } from '@/app/is-authenticated';


function SignedOutMenuItems() {
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
          <Link href="/account/create-account">
            <a className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}>
              Create Account
            </a>
          </Link>
        )}
      </Menu.Item>
    </>
  );
}

function SignedInMenuItems() {
  router = useRouter();
  const [isSigningOut, startSignOutTransition] = useTransition();
  const [isDeletingAccount, startDeleteAccountTransition] = useTransition();

  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link href="/account/manage-account">
            <a className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}>
              Manage Account
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a
            className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}
            onClick={() => {
              startSignOutTransition(async () => {
                await postJSON({path: 'users/sign-out', deleteCookies: true, redirectSignIn: false});
                router.push('/');
              });
            }}>
            Sign Out
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a
            className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-danger' : 'bg-medium-danger'}`}
            onClick={() => {
              startDeleteAccountTransition(async () => {
                await postJSON({path: 'users/delete-account', deleteCookies: true, redirectSignIn: false});
                router.push('/');
              });
            }}>
            Delete Account
          </a>
        )}
      </Menu.Item>
    </>
  );
}

export function AccountButton() {
  const [authenticated, setAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
    };
    checkAuthentication();
  }, []);

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
          {(authenticated === null) ?
            <Menu.Item disabled>
              <a className={`block px-4 py-2 rounded-b-md bg-medium-neutral`}>
                An Error Occurred
              </a>
            </Menu.Item> : (authenticated === true) ?
            <SignedInMenuItems /> :
            <SignedOutMenuItems />
          }
        </Menu.Items>
      </Menu>
    </div>
  );
}
