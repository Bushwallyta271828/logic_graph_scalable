'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDebateContext } from '@/app/debates/[debateID]/_debate_context/debate-context';
import { ClaimTab } from '@/app/debates/[debateID]/claim-tab';
import { ClaimContentBox } from '@/app/debates/[debateID]/claim-content-box';
import { DefinitionList } from '@/app/debates/[debateID]/definition-list';


export function ClaimBox({claimID} : {claimID: string}) {
  const { claimLookup } = useDebateContext();
  const claim = claimLookup[claimID];
  if (claim === null) {
    throw new Error("claimID not present in claimLookup");
  }

  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const hasDefinitions = acceptsDefinitions && claim.definitionClaimIDs.length >= 1;

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: claimID});

  const style = {transition, transform: CSS.Translate.toString(transform)};

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`flex flex-col ${isDragging ? 'z-40' : ''}`}>
      <div className={`${claim.conditioning === true ? 'ml-64' : claim.conditioning === false ? 'mr-64' : ''}`}>
        <div
          className={`flex ${hasDefinitions ? 'rounded-tr-md rounded-tl-md rounded-bl-md' : 'rounded-md'} shadow-xl`}
          {...listeners}>
          <ClaimTab claim={claim} />
          <ClaimContentBox claim={claim} hasDefinitions={hasDefinitions} />
        </div>
        {acceptsDefinitions ?
          <div className="ml-14">
            <DefinitionList claim={claim} />
          </div> :
          null
        }
      </div>
    </div>
  );
}
