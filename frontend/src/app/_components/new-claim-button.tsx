'use client';

import { Menu } from '@headlessui/react'
import { useClaimsContext } from '@/app/_contexts/claims-context';

export function NewClaimButton() {
  const { newClaimID, addClaim } = useClaimsContext();

  const addTextClaim = () => {
    const claimID = newClaimID();
    addClaim({
      claimID: claimID,
      author: 'local',
      claimType: 'text' as const,
      text: '',
      definitionClaimIDs: []
    });
  }
  
  const addDefinitionClaim = () => {
    const claimID = newClaimID();
    addClaim({
      claimID: claimID,
      author: 'local',
      claimType: 'definition' as const,
      text: '',
      definitionClaimIDs: []
    });
  }

  const addZerothOrderClaim = () => {
    const claimID = newClaimID();
    addClaim({
      claimID: claimID,
      author: 'local',
      claimType: 'zeroth-order' as const,
      formula: ''
    });
  }
  
  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          {({ open }) => 
            open
              ? (<p className="px-2 py-1 rounded bg-medium-neutral hover:bg-bright-neutral">New Claim</p>)
              : (<p className="px-2 py-1 rounded bg-transparent hover:bg-medium-neutral">New Claim</p>) 
          }
        </Menu.Button>
        <Menu.Items className="absolute w-40 origin-top-right z-10 bg-transparent outline-none rounded-md shadow-xl text-sm font-normal">
          <div>
            <Menu.Item
                as="a"
                  className="block px-4 py-2 rounded-t-md ui-active:bg-bright-text ui-not-active:bg-medium-text"
                  onClick={addTextClaim}>
                  Text Claim
            </Menu.Item>
            <Menu.Item
                as="a"
                  className="block px-4 py-2 ui-active:bg-bright-definition ui-not-active:bg-medium-definition"
                  onClick={addDefinitionClaim}>
                  Definition Claim
            </Menu.Item>
            <Menu.Item
                as="a"
                  className="block px-4 py-2 rounded-b-md ui-active:bg-bright-zeroth-order ui-not-active:bg-medium-zeroth-order"
                  onClick={addZerothOrderClaim}>
                  Zeroth Order Claim
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
