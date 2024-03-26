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
    <div className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm cursor-pointer">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p onClick={handleClick}>
          {text}
        </p>
      )}
    </div>
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
      <div className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm">
        <ContentRegion initialText={initialText} />
      </div>
    </div>
  );
}
