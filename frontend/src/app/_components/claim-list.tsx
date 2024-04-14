'use client';

import { useSensors, useSensor, PointerSensor, DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { ClaimBox } from '@/app/_components/claim-box';

export function ClaimList() {
  //Credit to https://www.youtube.com/watch?v=dL5SOdgMbRY for helping to create some starter code!
  const { claimIDs, moveClaim } = useClaimsContext();

  function handleDragEnd(event : DragEndEvent) {
    const {active, over} = event;
    if (!over) {return;}
    moveClaim({startClaimID: active.id, endClaimID: over.id});
  }

  //From https://github.com/clauderic/dnd-kit/issues/591
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={claimIDs}
        strategy={verticalListSortingStrategy}
        className="flex flex-col p-4 gap-4">
        {claimIDs.map((claimID: string) => (
          <ClaimBox claimID={claimID} key={claimID} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
