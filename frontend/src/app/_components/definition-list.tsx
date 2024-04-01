'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ClaimWithDefinitions, DefinitionClaim } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';

function DefinitionBox({definitionClaimID, index, final, parentClaimID}:
  {definitionClaimID: string, index: number, final: boolean, parentClaimID: string}) {
  /**
   * Note: I'm assuming that parentClaimID and definitionClaimID are both alphanumeric.
   * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */

  const { claimLookup } = useClaimsContext();
  let definitionText = '';
  let validDefinition = false;
  if (!(definitionClaimID in claimLookup)) {
    definitionText = "Oops, looks like that's not a valid claim ID!";
  } else {
    const definitionClaim = claimLookup[definitionClaimID];
    if (definitionClaim.claimType !== 'definition') {
      definitionText = "Oops, looks like that claim ID doesn't correspond to a definition!";
    } else {
      definitionText = definitionClaim.text;
      validDefinition = true;
    }
  }

  return (
    <Draggable draggableId={parentClaimID+"."+definitionClaimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-t border-bright-neutral">
          <div className="flex">
            <div className={`${final ? "rounded-bl-md" : "rounded-none"} text-white bg-definition-tab w-20 p-2`}>
              <p className="text-sm truncate">{definitionClaimID}</p>
            </div>
            <div className={`${final ? "rounded-br-md" : "rounded-none"} ${validDefinition ? "text-white" : "text-bright-neutral"} bg-definition-body flex-1 p-2 min-w-0`}>
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
                parentClaimID={claim.claimID}
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
