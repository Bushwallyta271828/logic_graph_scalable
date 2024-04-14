'use client';

import { useState } from 'react';
import { useSensors, useSensor, PointerSensor, DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ClaimWithDefinitions } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';

function DefinitionBox({initialDefinitionClaimID, final, parentClaim}:
  {initialDefinitionClaimID: string, final: boolean, parentClaim: ClaimWithDefinitions}) {
  /**
   * Note: I'm assuming that parentClaim.claimID and initialDefinitionClaimID are both alphanumeric.
   * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */

  const { claimLookup, editDefinitionClaimID } = useClaimsContext();

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

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: parentClaim.claimID+'.'+initialDefinitionClaimID});
 
  const style = {transition, transform: CSS.Transform.toString(transform)};
 
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex border-t border-bright-neutral">
      <div className={`${final ? "rounded-bl-md" : "rounded-none"} text-white ${validDefinition ? "bg-medium-definition" : "bg-medium-danger"} w-20 p-2`}>
        <input
          type="text"
          value={definitionClaimID}
          onChange={(e) => setDefinitionClaimID(e.target.value)}
          onBlur={() => editDefinitionClaimID({claim: parentClaim, oldDefinitionClaimID: initialDefinitionClaimID, newDefinitionClaimID: definitionClaimID})}
          className="text-sm truncate bg-transparent w-full outline-none"
        />
      </div>
      <div className={`${final ? "rounded-br-md" : "rounded-none"} text-white ${validDefinition ? "bg-dark-definition" : "bg-dark-danger"} flex-1 p-2 min-w-0`}>
        <p className="text-sm break-words">{definitionText}</p>
      </div>
    </div>
  );
}

export function DefinitionList({claim} : {claim: ClaimWithDefinitions}) {
  const { moveDefinition } = useClaimsContext();

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (!over) {return;}
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
