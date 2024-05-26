'use client';

import { Menu } from '@headlessui/react';
import { useDebateContext } from '@/app/debates/[debateID]/_debate_context/debate-context';

export function NewClaimButton() {
  const { addClaim } = useDebateContext();

  return (
    <div className="text-white text-lg font-bold relative">
      <Menu>
        <Menu.Button>
          {({ open }) => 
            open
              ? (<p className="px-2 py-1 rounded-md bg-medium-neutral hover:bg-bright-neutral">New Claim</p>)
              : (<p className="px-2 py-1 rounded-md bg-transparent hover:bg-medium-neutral">New Claim</p>) 
          }
        </Menu.Button>
        <Menu.Items className="absolute w-36 origin-top-right z-30 bg-transparent outline outline-1 outline-white rounded-md shadow-xl text-sm font-normal">
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
                  className={`block px-4 py-2 ${active ? 'bg-bright-constraint' : 'bg-medium-constraint'}`}
                  onClick={() => addClaim({author: 'local', claimType: 'constraint' as const, text: '', conditioning: null})}>
                  Constraint Claim
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
