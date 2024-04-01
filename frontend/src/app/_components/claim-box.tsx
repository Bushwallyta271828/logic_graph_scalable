'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Claim } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { DefinitionList } from '@/app/_components/definition-list';
import { TextContentBox } from '@/app/_components/text-content-box';
import { DefinitionContentBox } from '@/app/_components/definition-content-box';
import { ZerothOrderContentBox } from '@/app/_components/zeroth-order-content-box';

function ClaimContentBox({claim}: {claim: Claim}) {
  //I'm taking in claim as opposed to claimID to make absolutely sure that
  //the claim rendered by ClaimBox matches the content box.
  //I'm also using claim instead of claimID for the type-specific function
  //calls so that the type checker knows that the properties are correct.
  switch (claim.claimType) {
    case 'text':
      return TextContentBox({textClaim: claim});
    case 'definition':
      return DefinitionContentBox({definitionClaim: claim});
    case 'zeroth-order':
      return ZerothOrderContentBox({zerothOrderClaim: claim});
    default:
      throw new Error('Unrecognized claimType');
  }
}

export function ClaimBox({claimID, index} : {claimID: string, index: number}) {
  const { claimLookup } = useClaimsContext();
  const claim = claimLookup[claimID];
  if (!claim) {
    throw new Error("claimID not present in claimLookup");
  }

  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const hasDefinitions = !acceptsDefinitions || claim.definitionClaimIDs.length === 0;

  return (
    <Draggable draggableId={claim.claimID} index={index}>
      {provided => (
        <div className="flex flex-col"
          ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex shadow-xl" {...provided.dragHandleProps}>
            <div className={`${claim.claimType === 'text' ? 'bg-medium-text' : claim.claimType === 'definition' ? 'bg-medium-definition' : 'bg-medium-zeroth-order'} w-20 p-2 rounded-l-md`}>
              <p className="text-white text-sm truncate">{claim.claimID}</p>
              <p className="text-white text-sm truncate">{claim.author}</p>
            </div>
            <div className={`${claim.claimType === 'text' ? 'bg-dark-text' : claim.claimType === 'definition' ? 'bg-dark-definition' : 'bg-dark-zeroth-order'} flex-1 p-2 min-w-0 rounded-tr-md ${hasDefinitions ? 'rounded-br-md' : ''}`}>
              <ClaimContentBox claim={claim}/>
            </div>
          </div>
          {acceptsDefinitions ?
            <div className="ml-20">
              <DefinitionList claim={claim} />
            </div> :
            null
          }
        </div>
      )}
    </Draggable>
  );
}
