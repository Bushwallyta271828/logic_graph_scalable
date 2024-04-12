//'use client';
//
//import { useState, useRef, useEffect } from 'react';
//import { ZerothOrderClaim } from '@/app/_types/claim-types';
//
//export function ZerothOrderContentBox({ zerothOrderClaim }: { zerothOrderClaim: ZerothOrderClaim}) {
//  const [text, setText] = useState(zerothOrderClaim.formula);
//  const [isEditing, setIsEditing] = useState(false);
//  const textareaRef = useRef<HTMLTextAreaElement>(null);
//
//  const adjustHeight = () => {
//    if (textareaRef.current) {
//      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//    }
//  };
//
//  useEffect(() => {
//    adjustHeight();
//  }, [text, isEditing]);
//
//  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//    setText(e.target.value);
//    adjustHeight();
//  };
//
//  return (
//    <>
//      {isEditing ? (
//        <textarea
//          ref={textareaRef}
//          className="bg-transparent text-white text-sm w-full h-full break-words outline-none"
//          value={text}
//          onChange={handleChange}
//          onBlur={() => setIsEditing(false)}
//          autoFocus
//          style={{ overflow: 'hidden' }}
//        />
//      ) : (
//        <p className="text-white text-sm w-full h-full break-words"
//          onClick={() => setIsEditing(true)}>
//          {text}
//        </p>
//      )}
//    </>
//  );
//}





'use client';

import { useState, useEffect } from 'react';
import { MathJax } from 'better-react-mathjax';
import { ZerothOrderClaim } from '@/app/_types/claim-types';

const config = {
  loader: { load: ['input/asciimath'] },
  asciimath: { delimiters: [["$$","$$"]] },
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
  },
};

export function ZerothOrderContentBox({ zerothOrderClaim }: { zerothOrderClaim: ZerothOrderClaim}) {
  const [input, setInput] = useState<string>("");

  // Update the MathJax rendering every time the input changes
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [input]);

  return (
    <MathJaxContext config={config}>
      <div className="flex flex-col space-y-4 p-4">
        <textarea
          className="form-textarea mt-1 block w-full border rounded-md"
          rows={4}
          placeholder="Type your equations here using $$ to wrap them, e.g., $$x^2$$"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div>
          <MathJax dynamic>
            {input}
          </MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
};
