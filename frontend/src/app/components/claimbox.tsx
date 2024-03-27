'use client';

import { useState } from 'react';

type ClaimBoxProps = {
  initialText: string;
  claimID: string;
  user: string;
};

type ContentRegionProps = {
  initialText: string;
};

function ContentRegion({initialText} : ContentRegionProps) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <textarea
          className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p
          className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm"
          onClick={handleClick}>
          {text}
        </p>
      )}
    </>
  );
}

export default function ClaimBox({initialText, claimID, user} : ClaimBoxProps) {
  return (
    <div className="flex shadow-xl">
      <div className="bg-slate-800 text-white w-30 p-2 rounded-l-md text-ellipsis text-sm">
        <p>{claimID}</p>
        <p>{user}</p>
      </div>
      <ContentRegion initialText={initialText} />
    </div>
  );
}
