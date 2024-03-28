'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export type DefinitionBoxProps = {
  text: string;
  claimID: string;
};

export type ClaimBoxProps = {
  initialText: string;
  claimID: string;
  user: string;
  definitions: DefinitionBoxProps[];
};

const DefinitionBox = ({definition, index, final}: {definition: DefinitionBoxProps, index: number, final: boolean}) => {
  return (
    //draggableID only needs to be unique within each DragDropContext, i.e. the list for each claim.
    <Draggable draggableId={definition.claimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div className="flex shadow-xl">
            <div className="bg-red-800 text-white w-30 p-2 rounded-l-md text-ellipsis text-sm">
              <p>{definition.claimID}</p>
            </div>
            <div className=`bg-red-${final ? 700 : 900} text-white flex-1 p-2 rounded-r-md text-ellipsis text-sm`>
              <p>{definition.text}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function DefinitionList({initialDefinitions, claimID} : {initialDefinitions: DefinitionBoxProps[], claimID: string}) {
  //I only use the claimID to generate a unique key for each DefinitionBox
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
      <Droppable droppableId="list">
        {provided => (
          <div className="flex flex-col"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {definitions.map((definition: DefinitionBoxProps, index: number) => (
              <DefinitionBox
                definition={definition}
                index={index}
                final=(index===definitions.length - 1)
                key={claimID+"."+definition.claimID}
                //Note: I'm assuming that claimID and definition.claimID are both alphanumeric.
                //Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key.
              />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}


function ClaimContentRegion({initialText} : {initialText : string}) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <textarea
          className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p
          className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm"
          onClick={handleClick}>
          {text}
        </p>
      )}
    </>
  );
}

export function ClaimBox({initialText, claimID, user, definitions} : ClaimBoxProps) {
  return (
    <div className="flex shadow-xl">
      <div className="flex">
        <div className="bg-slate-800 text-white w-30 p-2 rounded-l-md text-ellipsis text-sm">
          <p>{claimID}</p>
          <p>{user}</p>
        </div>
        <ClaimContentRegion initialText={initialText} />
      </div>
      <div className="ml-30">
        <DefinitionList definitions={definitions} />
      </div>
    </div>
  );
}
