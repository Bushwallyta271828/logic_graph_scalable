'use client';

import { Menu } from '@headlessui/react'
import { useClaimsContext } from '@/app/_contexts/claims-context';

export function NewClaimButton() {
  const { addClaim } = useClaimsContext();

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          {({ open }) => 
            open
              ? (<p className="px-2 py-1 rounded-md bg-medium-neutral hover:bg-bright-neutral">New Claim</p>)
              : (<p className="px-2 py-1 rounded-md bg-transparent hover:bg-medium-neutral">New Claim</p>) 
          }
        </Menu.Button>
        <Menu.Items className="absolute w-40 origin-top-right z-20 bg-transparent outline-none rounded-md shadow-xl text-sm font-normal">
          <div>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-text' : 'bg-medium-text'}`}
                  onClick={() => addClaim({author: 'local', claimType: 'text' as const, text: '', conditioning: null})}>
                  Text Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 ${active ? 'bg-bright-zeroth-order' : 'bg-medium-zeroth-order'}`}
                  onClick={() => addClaim({author: 'local', claimType: 'zeroth-order' as const, text: '', conditioning: null})}>
                  Zeroth Order Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 rounded-b-md ${active ? 'bg-bright-definition' : 'bg-medium-definition'}`}
                  onClick={() => addClaim({author: 'local', claimType: 'definition' as const, text: '', conditioning: null})}>
                  Definition Claim
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
