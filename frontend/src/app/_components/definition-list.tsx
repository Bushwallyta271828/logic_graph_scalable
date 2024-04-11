'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ClaimWithDefinitions } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';

function DefinitionBox({initialDefinitionClaimID, index, final, parentClaim}:
  {initialDefinitionClaimID: string, index: number, final: boolean, parentClaim: ClaimWithDefinitions}) {
  /**
   * Note: I'm assuming that parentClaim.claimID and initialDefinitionClaimID are both alphanumeric.
   * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */

  const { claimLookup, editDefinitionClaimID } = useClaimsContext();

  let definitionText = '';
  let validDefinition = false;
  if (!(initialDefinitionClaimID in claimLookup)) {
    definitionText = "Oops, looks like that's not a valid claim ID!";
  } else {
    const definitionClaim = claimLookup[initialDefinitionClaimID];
    if (definitionClaim.claimType !== 'definition') {
      definitionText = "Oops, looks like that claim ID doesn't correspond to a definition!";
    } else {
      definitionText = definitionClaim.text;
      validDefinition = true;
    }
  }

  const [ definitionClaimID, setDefinitionClaimID ] = useState(initialDefinitionClaimID);
  
  return (
    <Draggable draggableId={parentClaim.claimID+"."+initialDefinitionClaimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-t border-bright-neutral">
          <div className="flex">
            <div className={`${final ? "rounded-bl-md" : "rounded-none"} text-white bg-medium-definition w-20 p-2`}>
              <input
                type="text"
                value={definitionClaimID}
                onChange={(e) => setDefinitionClaimID(e.target.value)}
                onBlur={() => editDefinitionClaimID({claim: parentClaim, index: index, newDefinitionClaimID: definitionClaimID})}
                className="text-sm truncate bg-transparent w-full outline-none"
              />
            </div>
            <div className={`${final ? "rounded-br-md" : "rounded-none"} ${validDefinition ? "text-white" : "text-bright-neutral"} bg-dark-definition flex-1 p-2 min-w-0`}>
              <p className="text-sm break-words">{definitionText}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export function DefinitionList({claim} : {claim: ClaimWithDefinitions}) {
  const { moveDefinition } = useClaimsContext();

  function onDragEnd(result : DropResult) {
    if (!result.destination) {return;}
    moveDefinition({claim: claim, startIndex: result.source.index, endIndex: result.destination.index});
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={claim.claimID+"-list"}>
        {provided => (
          <div className="flex flex-col rounded-b-md shadow-xl" //rounded-b-md only needed for shadow
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {claim.definitionClaimIDs.map((definitionClaimID: string, index: number) => (
              <DefinitionBox
                definitionClaimID={definitionClaimID}
                index={index}
                final={index===claim.definitionClaimIDs.length - 1}
                parentClaim={claim}
                key={claim.claimID+"."+definitionClaimID}
                /**
                 * Note: I'm assuming that claim.claimID and definitionClaimID are both alphanumeric.
                 * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
              />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
