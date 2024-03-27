'use client';

import { ClaimBox, ClaimBoxProps } from "@/app/components/claimbox";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export type ClaimListProps = {
  claims: ClaimBoxProps[];
};

type MovableClaimBoxProps = {
  claim: ClaimBoxProps;
  index: number;
};

const MovableClaimBox = ({claim, index}: MovableClaimBoxProps) => {
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

const reorder = (indexedClaims: MovableClaimBoxProps[], startIndex: number, endIndex: number) => {
  const result = Array.from(indexedClaims);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function ClaimList({claims} : ClaimListProps) {
  const initialOrderedClaims = claims.map(
    (claim: ClaimBoxProps, index: number) => ({claim: claim, index: index})
  );
  const [orderedClaims, setOrderedClaims] = useState(initialOrderedClaims);

  function onDragEnd(result : DropResult) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }

    const newOrderedClaims = reorder(
      orderedClaims,
      result.source.index,
      result.destination.index
    );

    setOrderedClaims(newOrderedClaims);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div className="flex flex-col p-4 gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {orderedClaims.map((orderedClaim: MovableClaimBoxProps, index: number) => (
              <MovableClaimBox {...orderedClaim} key={orderedClaim.claim.claimID} />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
