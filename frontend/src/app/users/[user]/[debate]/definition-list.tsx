'use client';

import { useState } from 'react';
import { useSensors, useSensor, PointerSensor, DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ClaimWithDefinitions } from '@/app/users/[user]/[debate]/_debate_context/claim-types';
import { useDebateContext } from '@/app/users/[user]/[debate]/_debate_context/debate-context';

function DefinitionBox({initialDefinitionClaimID, final, parentClaim}:
  {initialDefinitionClaimID: string, final: boolean, parentClaim: ClaimWithDefinitions}) {
  /**
   * Note: I'm assuming that parentClaim.claimID and initialDefinitionClaimID are both alphanumeric.
   * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */

  const { claimLookup, editDefinitionClaimID } = useDebateContext();

  let definitionText = '';
  let validDefinition = false;
  if (!(initialDefinitionClaimID in claimLookup)) {
    definitionText = "Please enter the claim ID for the desired definition. A valid claim ID has not been entered.";
  } else {
    const definitionClaim = claimLookup[initialDefinitionClaimID];
    if (definitionClaim.claimType !== 'definition') {
      definitionText = "This claim ID doesn't seem to correspond to a definition.";
    } else {
      definitionText = definitionClaim.text;
      validDefinition = true;
    }
  }

  const [ definitionClaimID, setDefinitionClaimID ] = useState(initialDefinitionClaimID);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: parentClaim.claimID+'.'+initialDefinitionClaimID});
 
  const style = {transition, transform: CSS.Translate.toString(transform)};
 
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex border-t border-bright-neutral ${isDragging ? 'z-40' : 'z-0'}`}>
      <input
        type="text"
        value={definitionClaimID}
        onChange={(e) => setDefinitionClaimID(e.target.value)}
        onBlur={() => editDefinitionClaimID({claim: parentClaim, oldDefinitionClaimID: initialDefinitionClaimID, newDefinitionClaimID: definitionClaimID})}
        className={`${final ? "rounded-bl-md" : "rounded-none"} text-white text-sm truncate ${validDefinition ? "bg-medium-definition" : "bg-medium-danger"} outline-none w-14 p-2`}
      />
      <div className={`${final ? "rounded-br-md" : "rounded-none"} text-white ${validDefinition ? "bg-dark-definition" : "bg-dark-danger"} flex-1 p-2 min-w-0`}>
        <p className="text-sm break-words">{definitionText}</p>
      </div>
    </div>
  );
}

export function DefinitionList({claim} : {claim: ClaimWithDefinitions}) {
  const { moveDefinition } = useDebateContext();

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (over === null) {return;}
    if (typeof active.id !== 'string' || typeof over.id !== 'string')
      {throw new Error("Unexpected identifier type");}

    const splitActiveID = active.id.split(".");
    const splitOverID = over.id.split(".");
    if (
      splitActiveID.length !== 2 ||
      splitOverID.length !== 2 ||
      splitActiveID[0] !== claim.claimID ||
      splitOverID[0] !== claim.claimID)
      {throw new Error("Unrecognized identifier format");}

    moveDefinition({claim: claim, startDefinitionClaimID: splitActiveID[1], endDefinitionClaimID: splitOverID[1]});
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={claim.definitionClaimIDs.map((definitionClaimID) => claim.claimID+'.'+definitionClaimID)}
        strategy={verticalListSortingStrategy}>
        <div className="flex flex-col rounded-b-md shadow-xl">
          {claim.definitionClaimIDs.map((definitionClaimID: string, index: number) => (
            <DefinitionBox
              initialDefinitionClaimID={definitionClaimID}
              final={index===claim.definitionClaimIDs.length - 1}
              parentClaim={claim}
              key={claim.claimID+'.'+definitionClaimID}
              /**
               * Note: I'm assuming that claim.claimID and definitionClaimID are both alphanumeric.
               * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
            />))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
