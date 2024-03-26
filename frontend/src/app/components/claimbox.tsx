'use client';

import { useState } from 'react';

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
        <input
          className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm"
          type="text"
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

type ClaimBoxProps = {
  initialText: string;
};

export default function ClaimBox({initialText} : ClaimBoxProps) {
  return (
    <div draggable="true" className="flex shadow-xl">
      <div className="bg-slate-800 text-white w-30 p-2 rounded-l-md text-ellipsis text-sm">
        <p>9372</p>
        <p>some_user</p>
      </div>
      <ContentRegion initialText={initialText} />
    </div>
  );
}
