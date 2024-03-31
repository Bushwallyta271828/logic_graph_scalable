'use client';

import { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Claim } from '@/app/_types/claim-types';
import { TextContentBox } from '@/app/_components/text-content-box';
import { DefinitionContentBox } from '@/app/_components/definition-content-box';
import { ZerothOrderContentBox } from '@/app/_components/zeroth-order-content-box';

function DefinitionBox({definition, index, final, parentClaimID}:
  {definition: string, index: number, final: boolean, parentClaimID: string}) {
  return (
    /**
     * Note: I'm assuming that parentClaimID and definition are both alphanumeric.
     * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
    <Draggable draggableId={parentClaimID+"."+definition} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div className="flex shadow-xl">
            <div className={`${final ? "rounded-bl-md" : "rounded-none"} bg-definition-tab text-white w-20 p-2`}>
              <p className="text-sm truncate">{definition}</p>
            </div>
            <div className={`${final ? "rounded-br-md" : "rounded-none"} bg-definition-body text-white flex-1 p-2 min-w-0`}>
              <p className="text-sm break-words">{"Oops, I'm not managing the program's state well yet."}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function DefinitionList({definitionClaimIDs, parentClaimID}:
  {definitionClaimIDs: string[], parentClaimID: string}) {
  //I only use the claimID to generate unique keys and ID's.
  const [definitions, setDefinitions] = useState(definitionClaimIDs);

  function onDragEnd(result : DropResult) {
    if (!result.destination || (result.destination.index === result.source.index)) {
      return;
    }

    const newDefinitions = Array.from(definitions);
    const [removed] = newDefinitions.splice(result.source.index, 1);
    newDefinitions.splice(result.destination.index, 0, removed);

    setDefinitions(newDefinitions);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={parentClaimID+"-list"}>
        {provided => (
          <div className="flex flex-col"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {definitions.map((definition: string, index: number) => (
              <DefinitionBox
                definition={definition}
                index={index}
                final={index===definitions.length - 1}
                parentClaimID={parentClaimID}
                key={parentClaimID+"."+definition}
                /**
                 * Note: I'm assuming that parentClaimID and definition are both alphanumeric.
                 * Otherwise "..."+"."+".." and ".."+"."+"..." would produce the same key. */
              />))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function ClaimContentBox({ claim }: { claim: Claim}) {
  switch (claim.claimType) {
    case 'text':
      return TextContentBox({textClaim: claim});
    case 'definition':
      return DefinitionContentBox({definitionClaim: claim});
    case 'zeroth-order':
      return ZerothOrderContentBox({zerothOrderClaim: claim});
    default:
      throw new Error('Unrecognized claim.claimType');
  }
}

export function ClaimBox({claim, index} : {claim: Claim, index: number}) {
  const includeDefinitions = 'definitionClaimIDs' in claim;

  console.log(`bg-${claim.claimType}-tab w-20 p-2 rounded-l-md`);

  //Which element is on the right can change depending on the value of includeDefinitions.
  const bottomRightRounding = (!includeDefinitions || claim.definitionClaimIDs.length === 0) ? ' rounded-br-md' : '';
  //const rightElementRounding = 'rounded-tr-md' + bottomRightRounding;
  //const claimContentRounding = !includeDefinitions ? rightElementRounding : '';

  return (
    <Draggable draggableId={claim.claimID} index={index}>
      {provided => (
        <div className="flex flex-col"
          ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex shadow-xl" {...provided.dragHandleProps}>
            <div className={`${claim.claimType === 'text' ? 'bg-text-tab' : claim.claimType === 'definition' ? 'bg-definition-tab' : 'bg-zeroth-order-tab'} w-20 p-2 rounded-l-md`}>
              <p className="text-white text-sm truncate">{claim.claimID}</p>
              <p className="text-white text-sm truncate">{claim.author}</p>
            </div>
            <div className={`${claim.claimType === 'text' ? 'bg-text-body' : claim.claimType === 'definition' ? 'bg-definition-body' : 'bg-zeroth-order-body'} flex-1 p-2 min-w-0 ${!includeDefinitions ? 'rounded-tr-md' : ''} ${!includeDefinitions && bottomRightRounding ? 'rounded-br-md' : ''}`}>
              <ClaimContentBox claim={claim}/>
            </div>
            {includeDefinitions ?
              <div className={`bg-definition-tab w-8 flex items-center justify-center rounded-tr-md ${bottomRightRounding ? 'rounded-br-md' : ''}`}>
                <p className="text-white text-lg">+</p>
              </div> :
              null
            }
          </div>
          {includeDefinitions ?
            <div className="ml-20">
              <DefinitionList definitionClaimIDs={claim.definitionClaimIDs} parentClaimID={claim.claimID} />
            </div> :
            null
          }
        </div>
      )}
    </Draggable>
  );
}
