'use client';

//
//export default function ClaimList({initialText} : ClaimListProps) {
//  return (
//    <div className="flex flex-col p-4 gap-4">
//      <ClaimBox initialText={initialText}/>
//      <ClaimBox initialText={initialText}/>
//      <ClaimBox initialText={initialText}/>
//      <ClaimBox initialText={initialText}/>
//    </div>
//  );
//}

import { ClaimBox, ClaimBoxProps } from "@/app/components/claimbox";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type ClaimListProps = {
  claims: ClaimBoxProps[];
};

type MovableClaimBoxProps = {
  claim: ClaimBoxProps;
  index: number;
};

const MovableClaimBox = ({claim, index}: MovableClaimBoxProps) {
  return (
    <Draggable draggableId={claim.claimID} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <ClaimBox {...claim} />
        </div>
      )}
    </Draggable>
  );
}

const reorder = (indexedClaims: IndexedClaimBoxProps[], startIndex: number, endIndex: number) => {
  const result = Array.from(claims);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type QuoteListType = {
  quotes: QuoteType[];
};

const function QuoteList({ quotes }: QuoteListType) {
  return quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
}

export default function ClaimList({claims} : Claims) {
  const [state, setState] = useState({ claims: claims });

  function onDragEnd(result : DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
