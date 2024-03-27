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

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { Quote as QuoteType } from "../types";

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: Quote = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <div style="width: 200px; border: 1px solid grey; margin-bottom: 8px; background-color: lightblue; padding: 8px;"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

export default function QuoteApp() {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
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


//const rootElement = document.getElementById("root");
//ReactDOM.render(<QuoteApp />, rootElement);

