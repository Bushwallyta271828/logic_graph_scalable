'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

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
          <div className="flex shadow-xl">
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

export function DefinitionList({definitionClaimIDs, parentClaimID}:
  {definitionClaimIDs: string[], parentClaimID: string}) {
  //I only use the claimID to generate unique keys and ID's.
  const [definitions, setDefinitions] = useState(definitionClaimIDs);

  function onDragEnd(result : DropResult) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }

    const newDefinitions = Array.from(definitions);
    const [removed] = newDefinitions.splice(result.source.index, 1);
    newDefinitions.splice(result.destination.index, 0, removed);

    setDefinitions(newDefinitions);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={parentClaimID+"-list"}>
        {provided => (
          <div className="flex flex-col"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {definitions.map((definition: string, index: number) => (
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
