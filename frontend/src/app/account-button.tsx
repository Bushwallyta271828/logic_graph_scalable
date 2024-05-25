'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useAccountContext } from '@/app/_account_context/account-context';
import { sendJSON } from '@/app/_api/api';
import { refreshAccount } from '@/app/_api/refresh-account';
import { DeletionDialog } from '@/app/deletion-dialog';


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

function SignedInMenuItems({signOut, setDialogOpen}:
  {signOut: () => void, setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
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
            className={`block px-4 py-2 ${active ? 'bg-bright-neutral' : 'bg-medium-neutral'}`}
            onClick={signOut}>
            Sign Out
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a
            className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-danger' : 'bg-medium-danger'}`}
            onClick={() => setDialogOpen(true)}>
            Delete Account
          </a>
        )}
      </Menu.Item>
    </>
  );
}

export function AccountButton() {
  const { account, setAccount } = useAccountContext();
  const router = useRouter();
  const [ dialogOpen, setDialogOpen ] = useState(false);

  useEffect(() => {
    refreshAccount({setAccount: setAccount});
  }, [setAccount]);

  const signOutOrDeleteAccount = async ({method, path}: {method: string, path: string}) => {
    await sendJSON({
      method: method,
      path: path,
      data: "{}",
      setAccount: setAccount,
      forceSignOut: true,
    });
    router.push("/");
  };

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
            </Menu.Item> : (account.status === 'error') ?
            <Menu.Item disabled>
              <a className={`block px-4 py-2 rounded-b-md bg-medium-neutral`}>
                Loading Error: {account.error}
              </a>
            </Menu.Item> : (account.status === 'signed out') ?
            <SignedOutMenuItems /> :
            <SignedInMenuItems
              signOut={async () => {await signOutOrDeleteAccount({method: "POST", path: "users/sign-out"});}}
              setDialogOpen={setDialogOpen}
            />
          }
        </Menu.Items>
      </Menu>
      <DeletionDialog
        title="Delete Account"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onDelete={async () => {await signOutOrDeleteAccount({method: "DELETE", path: "users/delete-account"});}}>
        <p>Deleting your account will permanently delete all of your debates.</p>
      </DeletionDialog>
    </div>
  );
}
