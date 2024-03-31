'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { ClaimBox } from '@/app/_components/claim-box';
import { Claim } from '@/app/_types/claim-types';

export function ClaimList() {
  const [claimIDs, setClaimIDs] = useClaimsContext();

  function onDragEnd(result : DropResult) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }

    const newClaimIDs = Array.from(claimIDs);
    const [removed] = newClaimIDs.splice(result.source.index, 1);
    newClaimIDs.splice(result.destination.index, 0, removed);

    setClaimIDs(newClaimIDs);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div className="flex flex-col p-4 gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {claimIDs.map((claimID: string, index: number) => (
              <ClaimBox claimID={claimID} index={index} key={claimID} />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
