'use client';

import { useState, useRef, useEffect } from 'react';
import { DefinitionClaim } from '@/app/_types/claim-types';

export function DefinitionContentBox({ definitionClaim }: { definitionClaim: DefinitionClaim}) {
  const [text, setText] = useState(definitionClaim.text);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustHeight();
  };

  return (
    <>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="bg-transparent text-white text-sm w-full h-full break-words outline-none"
          value={text}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
          style={{ overflow: 'hidden' }}
        />
      ) : (
        <p className="text-white text-sm w-full h-full break-words"
          onClick={() => setIsEditing(true)}>
          {text}
        </p>
      )}
    </>
  );
}
