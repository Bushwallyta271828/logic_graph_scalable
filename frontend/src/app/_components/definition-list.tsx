'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ClaimWithDefinitions } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_context/claims-context';

function DefinitionBox({definitionClaimID, index, final, parentClaimID}:
  {definitionClaimID: string, index: number, final: boolean, parentClaimID: string}) {
  /**
   * Note: I'm assuming that parentClaimID and definitionClaimID are both alphanumeric.
   * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
  return (
    <Draggable draggableId={parentClaimID+"."+definitionClaimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-t border-neutral-500">
          <div className="flex">
            <div className={`${final ? "rounded-bl-md" : "rounded-none"} bg-definition-tab text-white w-20 p-2`}>
              <p className="text-sm truncate">{definitionClaimID}</p>
            </div>
            <div className={`${final ? "rounded-br-md" : "rounded-none"} bg-definition-body text-white flex-1 p-2 min-w-0`}>
              <p className="text-sm break-words">{"Oops, I'm not managing the program's state well yet."}</p>
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
    moveDefinition({startIndex: result.source.index, endIndex: result.destination.index});
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={claimID+"-list"}>
        {provided => (
          <div className="flex flex-col rounded-b-md shadow-xl" //rounded-b-md only needed for shadow
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {claim.definitionClaimIDs.map((definitionClaimID: string, index: number) => (
              <DefinitionBox
                definitionClaimID={definitionClaimID}
                index={index}
                final={index===definitions.length - 1}
                parentClaimID={claim.claimID}
                key={parentClaimID+"."+definitionClaimID}
                /**
                 * Note: I'm assuming that parentClaimID and definitionClaimID are both alphanumeric.
                 * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
              />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
