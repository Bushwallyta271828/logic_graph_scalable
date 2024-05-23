'use client';

import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { Claim } from '@/app/debates/[debateID]/_debate_context/claim-types';
import { useDebateContext } from '@/app/debates/[debateID]/_debate_context/debate-context';
import { ClaimDeletionDialog } from '@/app/debates/[debateID]/claim-deletion-dialog';


export function ClaimTab({claim} : {claim: Claim}) {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const [ additionalAncestors, setAdditionalAncestors ] = useState<Claim[]>([]);
  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const { setConditioning, attachBlankDefinition, getAncestors, deleteClaim, claimLookup } = useDebateContext();

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
          <Popover.Button className={`${claim.claimType === 'text' ? 'bg-medium-text hover:bg-bright-text' : claim.claimType === 'definition' ? 'bg-medium-definition hover:bg-bright-definition' : 'bg-medium-constraint hover:bg-bright-constraint'} h-full w-14 p-2 rounded-l-md`}>
            <p className="text-white text-sm truncate">{claim.claimID}</p>
          </Popover.Button>
          <Popover.Panel className={`absolute origin-top-right z-20 ${claim.claimType === 'text' ? 'bg-dark-text' : claim.claimType === 'definition' ? 'bg-dark-definition' : 'bg-dark-constraint'} outline outline-1 outline-white rounded-md shadow-xl text-white text-sm font-normal`}>
            <div>
              <p className="px-4 py-2">Conditioning:</p>
              <div className="container mx-auto flex items-center">
                <Popover.Button
                  className={`block px-4 py-2 ${claim.claimType === 'text' ? (claim.conditioning === false ? 'bg-bright-text' : 'hover:bg-medium-text') : claim.claimType === 'definition' ? (claim.conditioning === false ? 'bg-bright-definition' : 'hover:bg-medium-definition') : (claim.conditioning === false ? 'bg-bright-constraint' : 'hover:bg-medium-constraint')}`}
                  onClick={() => setConditioning({claim: claim, newConditioning: false})}>
                  False
                </Popover.Button>
                <Popover.Button
                  className={`block px-4 py-2 ${claim.claimType === 'text' ? (claim.conditioning === null ? 'bg-bright-text' : 'hover:bg-medium-text') : claim.claimType === 'definition' ? (claim.conditioning === null ? 'bg-bright-definition' : 'hover:bg-medium-definition') : (claim.conditioning === null ? 'bg-bright-constraint' : 'hover:bg-medium-constraint')}`}
                  onClick={() => setConditioning({claim: claim, newConditioning: null})}>
                  None
                </Popover.Button>
                <Popover.Button
                  className={`block px-4 py-2 ${claim.claimType === 'text' ? (claim.conditioning === true ? 'bg-bright-text' : 'hover:bg-medium-text') : claim.claimType === 'definition' ? (claim.conditioning === true ? 'bg-bright-definition' : 'hover:bg-medium-definition') : (claim.conditioning === true ? 'bg-bright-constraint' : 'hover:bg-medium-constraint')}`}
                  onClick={() => setConditioning({claim: claim, newConditioning: true})}>
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
      <ClaimDeletionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        claim={claim}
        additionalClaims={additionalAncestors} />
    </>
  );
}
