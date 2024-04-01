'use client';

//<button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">

import { Menu } from '@headlessui/react'

export function AddClaimButton() {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          New Claim
        </Menu.Button>
        <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1"> {/* Wrapper to enforce vertical layout */}
            <Menu.Item>
              {({ active }) => (
                <a className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                  Text Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                  Definition Claim
                </a>
              )}
            </Menu.Item>
          </div>
          <Menu.Item disabled>
            <span className="block px-4 py-2 text-sm opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}