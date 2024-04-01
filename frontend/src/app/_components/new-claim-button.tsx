'use client';

import { Menu } from '@headlessui/react'

export function NewClaimButton() {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
          New Claim
        </Menu.Button>
        <Menu.Items className="absolute w-40 origin-top-right bg-transparent outline-none text-sm font-normal">
          <div>
            <Menu.Item>
              {({ active }) => (
                <a className={`block px-4 py-2 rounded-t-md ${active ? 'bg-text-tab' : 'bg-text-body'}`}>
                  Text Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`block px-4 py-2 ${active ? 'bg-definition-tab' : 'bg-definition-body'}`}>
                  Definition Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`block px-4 py-2 rounded-b-md ${active ? 'bg-zeroth-order-tab' : 'bg-zeroth-order-body'}`}>
                  Zeroth Order Claim
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
