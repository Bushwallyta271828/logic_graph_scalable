'use client';

//import ClaimBox from "@/app/components/claimbox";
//
//type ClaimListProps = {
//  initialText: string;
//};
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

import ClaimBox from "@/app/components/claimbox";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type QuoteType = {
  id: string;
  content: string;
}; 

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: QuoteType = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const reorder = (list: QuoteType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type QuoteFunctionType = {
  quote: QuoteType;
  index: number;
};

function Quote({ quote, index }: QuoteFunctionType) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <div
          style={{
            width: "200px", 
            border: "1px solid grey", 
            marginBottom: "8px", 
            backgroundColor: "lightblue", 
            padding: "8px"
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

type QuoteListType = {
  quotes: QuoteType[];
};

function QuoteList({ quotes }: QuoteListType) {
  return quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
}

export default function ClaimList() {
  const [state, setState] = useState({ quotes: initial });

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
