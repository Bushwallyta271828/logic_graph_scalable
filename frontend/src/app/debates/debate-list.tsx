'use client';

import { PointerEvent, useState } from 'react';
import { useSensors, useSensor, PointerSensor, DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DebateBox } from '@/app/debates/debate-box';


//From https://github.com/clauderic/dnd-kit/issues/477
// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }: PointerEvent) => {
  let cur = event.target as HTMLElement;
  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }
  return true;
};

class OptionalPointerSensor extends PointerSensor {
  static activators = [{ eventName: 'onPointerDown', handler }] as typeof PointerSensor['activators'];
}

export function DebateList() {
  //Credit to https://www.youtube.com/watch?v=dL5SOdgMbRY for helping to create some starter code!
  const [debateLookup, setDebateLookup] = useState<{ [debateID: string]: {title: string} }>({});
  const [debateIDs, setDebateIDs] = useState<string[]>([]);

  function handleDragEnd(event : DragEndEvent) {
    const {active, over} = event;
    if (over === null) {return;}
    if (typeof active.id !== 'string' || typeof over.id !== 'string')
      {throw new Error("Unexpected identifier type");}
    moveClaim({startClaimID: active.id, endClaimID: over.id});
  }

  //From https://github.com/clauderic/dnd-kit/issues/591
  const sensors = useSensors(
    useSensor(OptionalPointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div className="flex flex-col gap-1">
      <p className="text-white text-sm">New Debate</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={claimIDs}
          strategy={verticalListSortingStrategy}>
          <div className="flex flex-col p-1 gap-1">
            {claimIDs.map((claimID: string) => (
              <ClaimBox claimID={claimID} key={claimID} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
