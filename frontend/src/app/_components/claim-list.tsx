'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { ClaimBox } from '@/app/_components/claim-box';

export function ClaimList() {
  const { claimIDs, moveClaim } = useClaimsContext();

  function onDragEnd(result : DropResult) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }
    moveClaim(result.source.index, result.destination.index);
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
