'use client';

import { ClaimBox, ClaimBoxProps } from "@/app/components/claimbox";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export type ClaimListProps = {
  initialClaims: ClaimBoxProps[];
};

const MovableClaimBox = ({claim, index} : {claim: ClaimBoxProps, index: number}) => {
  return (
    <Draggable draggableId={claim.claimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <ClaimBox {...claim} />
        </div>
      )}
    </Draggable>
  );
}

export function ClaimList({initialClaims} : ClaimListProps) {
  const [claims, setClaims] = useState(initialClaims);

  function onDragEnd(result : DropResult) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }

    const newClaims = Array.from(claims);
    const [removed] = newClaims.splice(result.source.index, 1);
    newClaims.splice(result.destination.index, 0, removed);

    setClaims(newClaims);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div className="flex flex-col p-4 gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {claims.map((claim: ClaimBoxProps, index: number) => (
              <MovableClaimBox claim={claim} index={index} key={claim.claimID} />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
