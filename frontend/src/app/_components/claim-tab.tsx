'use client';

import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { Claim } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { DeletionDialog } from '@/app/_components/deletion-dialog';


export function ClaimTab({claim} : {claim: Claim}) {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ ancestors, setAncestors ] = useState<Set<string>>(new Set());
  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const { attachBlankDefinition, getAncestors } = useClaimsContext();

  const handleDelete = () => {
    const foundAncestors = getAncestors({claim: claim});
    if (foundAncestors.size === 1) {
      return null; //TODO
    } else if (foundAncestors.size > 1) {
      setAncestors(foundAncestors);
      setDialogOpen(true);
    } else {
      throw new Error("foundAncestors empty but must always contain starting claim ID");
    }
  }

  return (
    <>
      <div className="relative">
        <Menu>
          <Menu.Button className={`${claim.claimType === 'text' ? 'bg-medium-text hover:bg-bright-text' : claim.claimType === 'definition' ? 'bg-medium-definition hover:bg-bright-definition' : 'bg-medium-zeroth-order hover:bg-bright-zeroth-order'} h-full w-14 p-2 rounded-l-md`}>
            <p className="text-white text-sm truncate">{claim.claimID}</p>
          </Menu.Button>
          <Menu.Items className={`absolute w-40 origin-top-right z-20 bg-transparent outline-none rounded-md shadow-xl text-white text-sm font-normal`}>
            <div>
              {acceptsDefinitions ? 
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-definition' : 'bg-medium-definition'}`}
                      onClick={() => attachBlankDefinition(claim)}>
                      Attach Definition
                    </a>
                  )}
                </Menu.Item> :
                null
              }
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 ${acceptsDefinitions ? 'rounded-b-md' : 'rounded-md'} ${active ? 'bg-bright-danger' : 'bg-medium-danger'}`}
                    onClick=handleDelete>
                    Delete Claim
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
      <DeletionDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} claimsToDelete={ancestors} />
    </>
  );
}
