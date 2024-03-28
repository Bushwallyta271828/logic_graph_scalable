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
            <div className="bg-red-900 text-white flex-1 p-2 rounded-r-md text-ellipsis text-sm">
              <p>{definition.text}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

type ClaimContentRegionProps = {
  initialText: string;
};

function ClaimContentRegion({initialText} : ClaimContentRegionProps) {
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

export function ClaimBox({initialText, claimID, user} : ClaimBoxProps) {
  return (
    <div className="flex shadow-xl">
      <div className="bg-slate-800 text-white w-30 p-2 rounded-l-md text-ellipsis text-sm">
        <p>{claimID}</p>
        <p>{user}</p>
      </div>
      <ClaimContentRegion initialText={initialText} />
    </div>
  );
}
