'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export function DebateBox({claimID} : {claimID: string}) {
  const { claimLookup } = useDebateContext();
  const claim = claimLookup[claimID];
  if (claim === null) {
    throw new Error("claimID not present in claimLookup");
  }

  const hasDefinitions = false;

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: claimID});

  const style = {transition, transform: CSS.Translate.toString(transform)};

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`flex flex-col ${isDragging ? 'z-40' : ''}`}>
      <div
        className={`flex ${hasDefinitions ? 'rounded-tr-md rounded-tl-md rounded-bl-md' : 'rounded-md'} shadow-xl`}
        {...listeners}>
        <ClaimTab claim={claim} />
        <ClaimContentBox claim={claim} hasDefinitions={hasDefinitions} />
      </div>
    </div>
  );
}
