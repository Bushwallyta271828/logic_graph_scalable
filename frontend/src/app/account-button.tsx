'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useAccountContext } from '@/app/_account_context/account-context';
import { postJSON } from '@/app/_api/api';
import { refreshAccount } from '@/app/_api/refresh-account';


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
  const router = useRouter();
  const { setAccount } = useAccountContext();
  const [isSigningOut, startSignOutTransition] = useTransition();
  const [isDeletingAccount, startDeleteAccountTransition] = useTransition();

  const signOutOrDeleteAccount = async (path: string) => {
    await postJSON({
      path: path,
      data: "{}",
      setAccount: setAccount,
      forceSignOut: true,
    });
    router.push("/");
  };

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
              startSignOutTransition(async () => {await signOutOrDeleteAccount("users/sign-out");});
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
              startSignOutTransition(async () => {await signOutOrDeleteAccount("users/delete-account");});
            }}>
            Delete Account
          </a>
        )}
      </Menu.Item>
    </>
  );
}

export function AccountButton() {
  const { account, setAccount } = useAccountContext();

  useEffect(() => {
    refreshAccount({setAccount: setAccount});
  }, [setAccount]);

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
          {(account.status === 'loading') ?
            <Menu.Item disabled>
              <a className={`block px-4 py-2 rounded-b-md bg-medium-neutral`}>
                Loading...
              </a>
            </Menu.Item> : (account.status === 'loading error') ?
            <Menu.Item disabled>
              <a className={`block px-4 py-2 rounded-b-md bg-medium-neutral`}>
                Loading Error: {account.loadingError}
              </a>
            </Menu.Item> : (account.status === 'signed out') ?
            <SignedOutMenuItems /> :
            <SignedInMenuItems />
          }
        </Menu.Items>
      </Menu>
    </div>
  );
}
