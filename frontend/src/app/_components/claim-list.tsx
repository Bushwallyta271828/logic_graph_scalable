'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { ClaimBox } from '@/app/_components/claim-box';
import { Claim } from '@/app/_types/claim-types';

export function ClaimList({claims} : {claims: Claim[]}) {
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
            {claims.map((claim: Claim, index: number) => (
              <ClaimBox claim={claim} index={index} key={claim.claimID} />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
