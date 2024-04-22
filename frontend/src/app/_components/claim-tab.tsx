'use client';

import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { Claim } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { DeletionDialog } from '@/app/_components/deletion-dialog';


export function ClaimTab({claim} : {claim: Claim}) {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ additionalAncestors, setAdditionalAncestors ] = useState<Claim[]>([]);
  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const { attachBlankDefinition, getAncestors, deleteClaim, claimLookup } = useClaimsContext();

  const handleDelete = () => {
    const ancestors = getAncestors(claim);
    if (!ancestors.has(claim.claimID))
      {throw new Error("ancestors lacks starting claim ID");}
    const others = Array.from(ancestors)
      .filter((ancestor) => {return ancestor !== claim.claimID;})
      .map((claimID) => claimLookup[claimID]);
    if (others.length > 0) {
      setAdditionalAncestors(others);
      setDialogOpen(true);
    } else {
      deleteClaim(claim);
    }
  }

  return (
    <>
      <div className="relative">
        <Popover>
          <Popover.Button className={`${claim.claimType === 'text' ? 'bg-medium-text hover:bg-bright-text' : claim.claimType === 'definition' ? 'bg-medium-definition hover:bg-bright-definition' : 'bg-medium-zeroth-order hover:bg-bright-zeroth-order'} h-full w-14 p-2 rounded-l-md`}>
            <p className="text-white text-sm truncate">{claim.claimID}</p>
          </Popover.Button>
          <Popover.Panel className={`absolute origin-top-right z-20 ${claim.claimType === 'text' ? 'bg-dark-text' : claim.claimType === 'definition' ? 'bg-dark-definition' : 'bg-dark-zeroth-order'} outline-none rounded-md shadow-xl text-white text-sm font-normal`}>
            <div>
              <p className="px-4 py-2">Conditioning:</p>
              <div className="container mx-auto flex items-center">
                <Popover.Button
                  className={`block px-4 py-2 ${claim.claimType === 'text' : (claim.conditioning === false ? 'bg-bright-text' : 'hover:bg-medium-text') : claim.claimType === 'definition' ? (claim.conditioning === false ? 'bg-bright-definition' : 'hover:bg-medium-definition') : (claim.conditioning === false ? 'bg-bright-zeroth-order' : 'hover:bg-medium-zeroth-order')}`}>
                  False
                </Popover.Button>
                <Popover.Button
                  className={`block px-4 py-2 ${claim.claimType === 'text' : (claim.conditioning === null ? 'bg-bright-text' : 'hover:bg-medium-text') : claim.claimType === 'definition' ? (claim.conditioning === null ? 'bg-bright-definition' : 'hover:bg-medium-definition') : (claim.conditioning === null ? 'bg-bright-zeroth-order' : 'hover:bg-medium-zeroth-order')}`}>
                  None
                </Popover.Button>
                <Popover.Button
                  className={`block px-4 py-2 ${claim.claimType === 'text' : (claim.conditioning === true ? 'bg-bright-text' : 'hover:bg-medium-text') : claim.claimType === 'definition' ? (claim.conditioning === true ? 'bg-bright-definition' : 'hover:bg-medium-definition') : (claim.conditioning === true ? 'bg-bright-zeroth-order' : 'hover:bg-medium-zeroth-order')}`}>
                  True
                </Popover.Button>
              </div>
              {acceptsDefinitions ? 
                <Popover.Button
                  as="p"
                  className="block px-4 py-2 bg-medium-definition hover:bg-bright-definition"
                  onClick={() => attachBlankDefinition(claim)}>
                  Attach Definition
                </Popover.Button> :
                null
              }
              <Popover.Button
                as="p"
                className="block px-4 py-2 rounded-b-md bg-medium-danger hover:bg-bright-danger"
                onClick={handleDelete}>
                Delete Claim
              </Popover.Button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      <DeletionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        claim={claim}
        additionalClaims={additionalAncestors} />
    </>
  );
}
