'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export function DebateBox({claimID} : {claimID: string}) {
  const { claimLookup } = useDebateContext();
  const claim = claimLookup[claimID];
  if (claim === null) {
    throw new Error("claimID not present in claimLookup");
  }

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: claimID});
  const style = {transition, transform: CSS.Translate.toString(transform)};

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex flex-row rounded-md shadow-xl ${isDragging ? 'z-40' : ''}`}>
      <ClaimTab claim={claim} />
      <ClaimContentBox claim={claim} hasDefinitions={hasDefinitions} />
    </div>
  );
}













import { useState, useRef, useEffect } from 'react';


export function ClaimContentBox({claim, hasDefinitions}: {claim: Claim, hasDefinitions: boolean}) {
  const [text, setText] = useState(claim.text);
  const [editing, setEditing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { setClaimText, getDisplayData } = useDebateContext();
  const { validText, displayText } = getDisplayData(claim);

  useEffect(() => {
    if (editing && textRef.current !== null) {
      textRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    setClaimText({claimID: claim.claimID, newText: text});
  }

  return (
    <div className={`${!validText ? 'bg-dark-danger' : claim.claimType === 'text' ? 'bg-dark-text' : claim.claimType === 'definition' ? 'bg-dark-definition' : 'bg-dark-constraint'} relative flex-1 min-w-0 ${hasDefinitions ? 'rounded-tr-md' : 'rounded-r-md'} text-white text-sm break-words`}>
      {editing ?
        (<p
          ref={textRef}
          contentEditable="plaintext-only"
          className="w-full h-full p-2 outline-none"
          onInput={(e) => setText(e.currentTarget.innerText)}
          onBlur={handleBlur}>
          {claim.text}
        </p>) :
        (<p className="w-full h-full p-2" onClick={() => setEditing(true)}>
          {displayText}
        </p>)
      }
    </div>
  );
}
