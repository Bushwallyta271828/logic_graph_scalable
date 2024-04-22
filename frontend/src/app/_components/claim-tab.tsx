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
          <Popover.Panel className={`absolute w-40 origin-top-right z-20 bg-dark-neutral outline-none rounded-md shadow-xl text-white text-sm font-normal`}>
            <div>
              {acceptsDefinitions ? 
                <Popover.Button
                  as="p"
                  className="block px-4 py-2 rounded-t-md bg-medium-definition hover:bg-bright-definition"
                  onClick={() => attachBlankDefinition(claim)}>
                  Attach Definition
                </Popover.Button> :
                null
              }
              <p className="px-4 py-2">Conditioning:</p>
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
