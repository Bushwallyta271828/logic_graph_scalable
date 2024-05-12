'use client';

import { useState, useRef, useEffect } from 'react';
import { Claim } from '@/app/debates/[debateID]/_debate_context/claim-types';
import { useDebateContext } from '@/app/debates/[debateID]/_debate_context/debate-context';


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
      {(!validText && editing) ?
        (<div className="absolute z-10 bg-medium-danger rounded-md text-white text-sm">
          <p className="p-2">Please enter a valid constraint.</p>
          <p className="p-2">If your constraint doesn&apos;t need to reference probabilities, you can enter a logical formula in terms of the claim IDs. For example, you could enter the constraint &quot;(aaa and not bbb) implies (ccc or (ddd and eee))&quot; if &quot;aaa&quot;, &quot;bbb&quot;, &quot;ccc&quot;, &quot;ddd&quot;, and &quot;eee&quot; were all claim IDs. You may use &quot;and&quot;, &quot;or&quot;, &quot;not&quot;, and &quot;implies&quot; to build your logical formula.</p>
          <p className="p-2">If you need to specify the probability of a logical formula, you can wrap your logical formula inside &quot;P(...)&quot;. For example, &quot;P(aaa and not bbb) = 0.3&quot; would be a valid constraint if &quot;aaa&quot; and &quot;bbb&quot; were claim IDs. &quot;implies&quot; is disallowed inside probabilities because it can lead to confusion with conditional probability. If you want to talk about the probability of an implication, you probably want to use a conditional probability; if not, you can always expand the logical implication with an &quot;or&quot; and a &quot;not&quot;.</p>
          <p className="p-2">Speaking of conditional probabilities, you can assign a conditional probability of a logical formula given another logical formula on the left hand side of an equation to a real number between 0 and 1 (inclusive) on the right hand side. For example, &quot;P(ccc or (ddd and eee) | aaa and not bbb) = 0.7&quot; could be a valid constraint.</p>
          <p className="p-2">Finally, for the most generality, you can specify a linear (affine) constraint on the probabilities of logical formulas (conditional probabilities not allowed). For example, &quot;3.25*(P(aaa) + 0.8P(bbb or ccc)) = 2 - P(not ddd or eee)&quot; could be valid. Make sure to multiply with simplified coefficients on the left.</p>
        </div>) : 
        null
      }
    </div>
  );
}
