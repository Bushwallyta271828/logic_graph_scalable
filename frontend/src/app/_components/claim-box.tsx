'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { ClaimTab } from '@/app/_components/claim-tab';
import { ClaimContentBox } from '@/app/_components/claim-content-box';
import { DefinitionList } from '@/app/_components/definition-list';


export function ClaimBox({claimID} : {claimID: string}) {
  const { claimLookup } = useClaimsContext();
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
