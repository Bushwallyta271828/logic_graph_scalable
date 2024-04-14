'use client';

import { useState } from 'react';
import { ClaimWithDefinitions } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';

function DefinitionBox({initialDefinitionClaimID, index, final, parentClaim}:
  {initialDefinitionClaimID: string, index: number, final: boolean, parentClaim: ClaimWithDefinitions}) {
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

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({parentClaim.claimID+'.'+initialDefinitionClaimID});
 
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
          onBlur={() => editDefinitionClaimID({claim: parentClaim, index: index, newDefinitionClaimID: definitionClaimID})}
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
    moveDefinition({claim: claim, startDefinitionClaimID: active.id, endDefinitionClaimID: over.id});
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
        strategy={verticalListSortingStrategy}
        className="flex flex-col rounded-b-md shadow-xl">
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
      </SortableContext>
    </DndContext>
  );
}
