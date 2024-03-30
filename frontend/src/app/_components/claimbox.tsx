'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Claim } from '@/app/_types/claimtypes';

const DefinitionBox = ({definition, index, final, claimID}:
  {definition: DefinitionClaim, index: number, final: boolean, claimID: string}) => {
  return (
    /**
     * Note: I'm assuming that claimID and definition.claimID are both alphanumeric.
     * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
    <Draggable draggableId={claimID+"."+definition.claimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div className="flex shadow-xl">
            <div className={`${final ? "rounded-bl-md" : "rounded-none"} bg-teal-900 text-white w-20 p-2`}>
              <p className="text-sm truncate">{definition.claimID}</p>
            </div>
            <div className={`${final ? "rounded-br-md" : "rounded-none"} bg-teal-950 text-white flex-1 p-2 min-w-0`}>
              <p className="text-sm break-words">{definition.text}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function DefinitionList({initialDefinitions, claimID}:
  {initialDefinitions: DefinitionClaim[], claimID: string}) {
  //I only use the claimID to generate unique keys and ID's.
  const [definitions, setDefinitions] = useState(initialDefinitions);

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
      <Droppable droppableId={claimID+"-list"}>
        {provided => (
          <div className="flex flex-col"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {definitions.map((definition: DefinitionClaim, index: number) => (
              <DefinitionBox
                definition={definition}
                index={index}
                final={index===definitions.length - 1}
                claimID={claimID}
                key={claimID+"."+definition.claimID}
                /**
                 * Note: I'm assuming that claimID and definition.claimID are both alphanumeric.
                 * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
              />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export function ClaimBox({claim, index, tabColor, bodyColor, contentRegion, hasDefinitions}:
  {claim: Claim, index: number, tabColor: string, bodyColor: string, ContentRegion: ElementType, hasDefinitions: boolean}) {
  return (
    <Draggable draggableId={claim.claimID} index={index}>
      {provided => (
        <div className="flex flex-col"
          ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex shadow-xl" {...provided.dragHandleProps}>
            <div className={tabColor+" w-20 p-2 rounded-l-md"}>
              <p className="text-white text-sm truncate">{claim.claimID}</p>
              <p className="text-white text-sm truncate">{claim.author}</p>
            </div>
            <div className={bodyColor+" flex-1 p-2 min-w-0"}>
              <ContentRegion />
            </div>
            <div className={`bg-teal-900 w-8 flex items-center justify-center ${claim.definitions.length === 0 ? "rounded-r-md" : "rounded-tr-md"}`}>
              <p className="text-white text-lg">+</p>
            </div>
          </div>
          <div className="ml-20">
            <DefinitionList initialDefinitions={claim.definitions} claimID={claim.claimID} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
