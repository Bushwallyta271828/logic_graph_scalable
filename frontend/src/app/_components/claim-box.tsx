'use client';

import { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Claim } from '@/app/_types/claim-types';
import { DefinitionList } from '@/app/_components/definition-list';
import { TextContentBox } from '@/app/_components/text-content-box';
import { DefinitionContentBox } from '@/app/_components/definition-content-box';
import { ZerothOrderContentBox } from '@/app/_components/zeroth-order-content-box';

function ClaimContentBox({ claim }: { claim: Claim}) {
  switch (claim.claimType) {
    case 'text':
      return TextContentBox({textClaim: claim});
    case 'definition':
      return DefinitionContentBox({definitionClaim: claim});
    case 'zeroth-order':
      return ZerothOrderContentBox({zerothOrderClaim: claim});
    default:
      throw new Error('Unrecognized claim.claimType');
  }
}

export function ClaimBox({claim, index} : {claim: Claim, index: number}) {
  const includeDefinitions = 'definitionClaimIDs' in claim;

  console.log(`bg-${claim.claimType}-tab w-20 p-2 rounded-l-md`);

  //Note: I was going to simplify the logic so that the content box
  //is always rounded on the right if there's no Add Definition button,
  //but then I remembered that we might have user permission problems
  //in the future where a text claim has definitions but the user
  //can't add any of their own. 
  const bottomRightRounding = (!includeDefinitions || claim.definitionClaimIDs.length === 0) ? ' rounded-br-md' : '';

  return (
    <Draggable draggableId={claim.claimID} index={index}>
      {provided => (
        <div className="flex flex-col"
          ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex shadow-xl" {...provided.dragHandleProps}>
            <div className={`${claim.claimType === 'text' ? 'bg-text-tab' : claim.claimType === 'definition' ? 'bg-definition-tab' : 'bg-zeroth-order-tab'} w-20 p-2 rounded-l-md`}>
              <p className="text-white text-sm truncate">{claim.claimID}</p>
              <p className="text-white text-sm truncate">{claim.author}</p>
            </div>
            <div className={`${claim.claimType === 'text' ? 'bg-text-body' : claim.claimType === 'definition' ? 'bg-definition-body' : 'bg-zeroth-order-body'} flex-1 p-2 min-w-0 ${!includeDefinitions ? 'rounded-tr-md' : ''} ${!includeDefinitions && bottomRightRounding ? 'rounded-br-md' : ''}`}>
              <ClaimContentBox claim={claim}/>
            </div>
            {includeDefinitions ?
              <div className={`bg-definition-tab w-8 flex items-center justify-center rounded-tr-md ${bottomRightRounding ? 'rounded-br-md' : ''}`}>
                <p className="text-white text-lg">+</p>
              </div> :
              null
            }
          </div>
          {includeDefinitions ?
            <div className="ml-20">
              <DefinitionList definitionClaimIDs={claim.definitionClaimIDs} parentClaimID={claim.claimID} />
            </div> :
            null
          }
        </div>
      )}
    </Draggable>
  );
}
