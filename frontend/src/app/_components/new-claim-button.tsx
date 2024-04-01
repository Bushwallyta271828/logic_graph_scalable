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
        <Menu.Button className="bg-transparent hover:medium-neutral px-2 py-1 rounded">
          New Claim
        </Menu.Button>
        <Menu.Items className="absolute w-40 origin-top-right bg-transparent outline-none rounded-md shadow-xl text-sm font-normal">
          <div>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 rounded-t-md ${active ? 'bg-text-tab' : 'bg-text-body'}`}
                  onClick={addTextClaim}>
                  Text Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 ${active ? 'bg-definition-tab' : 'bg-definition-body'}`}
                  onClick={addDefinitionClaim}>
                  Definition Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 rounded-b-md ${active ? 'bg-zeroth-order-tab' : 'bg-zeroth-order-body'}`}
                  onClick={addZerothOrderClaim}>
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
