'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useClaimsContext } from '@app/_context/claims-context';

function DefinitionBox({definition, index, final, parentClaimID}:
  {definition: string, index: number, final: boolean, parentClaimID: string}) {
  return (
    /**
     * Note: I'm assuming that parentClaimID and definition are both alphanumeric.
     * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
    <Draggable draggableId={parentClaimID+"."+definition} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-t border-neutral-500">
          <div className="flex">
            <div className={`${final ? "rounded-bl-md" : "rounded-none"} bg-definition-tab text-white w-20 p-2`}>
              <p className="text-sm truncate">{definition}</p>
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

export function DefinitionList({claimID} : {claimID: string}) {
  const { claimLookup, moveDefinition } = useClaimsContext();

  function onDragEnd(result : DropResult) {
    moveDefinition({startIndex: result.source.index, endIndex: result.destination.index});
  }

  const getDefinitions(

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={claimID+"-list"}>
        {provided => (
          <div className="flex flex-col rounded-b-md shadow-xl" //rounded-b-md only needed for shadow
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {claimLookup[claimID].map((definitionClaimID: string, index: number) => (
              <DefinitionBox
                definition={definition}
                index={index}
                final={index===definitions.length - 1}
                parentClaimID={parentClaimID}
                key={parentClaimID+"."+definition}
                /**
                 * Note: I'm assuming that parentClaimID and definition are both alphanumeric.
                 * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
              />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
