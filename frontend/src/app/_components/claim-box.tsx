'use client';

import { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu } from '@headlessui/react';
import { Claim } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';
import { DefinitionList } from '@/app/_components/definition-list';

function ClaimTab({claim} : {claim: Claim}) {
  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const { attachBlankDefinition } = useClaimsContext();

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className={`${claim.claimType === 'text' ? 'bg-medium-text hover:bg-bright-text' : claim.claimType === 'definition' ? 'bg-medium-definition hover:bg-bright-definition' : 'bg-medium-zeroth-order hover:bg-bright-zeroth-order'} h-full w-14 p-2 rounded-l-md`}>
          <p className="text-white text-sm truncate">{claim.claimID}</p>
        </Menu.Button>
        <Menu.Items className={`absolute w-40 origin-top-right z-20 bg-transparent outline-none rounded-md shadow-xl text-white text-sm font-normal`}>
          <div>
            {acceptsDefinitions ? 
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-t-md ${active ? 'bg-bright-definition' : 'bg-medium-definition'}`}
                    onClick={() => attachBlankDefinition(claim)}>
                    Attach Definition
                  </a>
                )}
              </Menu.Item> :
              null
            }
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`block px-4 py-2 ${acceptsDefinitions ? 'rounded-b-md' : 'rounded-md'} ${active ? 'bg-bright-danger' : 'bg-medium-danger'}`}>
                  Delete Claim
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

function ClaimContentBox({claim, hasDefinitions}: {claim: Claim, hasDefinitions: boolean}) {
  const [text, setText] = useState(claim.text);
  const [editing, setEditing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { setClaimText, getDisplayData } = useClaimsContext();
  const [validText, setValidText] = useState(getDisplayData(claim).validText);

  useEffect(() => {
    if (editing && textRef.current) {
      textRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    setClaimText({claimID: claim.claimID, newText: text});
    setValidText(getDisplayData({...claim, text:text}).validText);
  }

  return (
    <div className={`${!validText ? 'bg-dark-danger' : claim.claimType === 'text' ? 'bg-dark-text' : claim.claimType === 'definition' ? 'bg-dark-definition' : 'bg-dark-zeroth-order'} relative flex-1 min-w-0 ${hasDefinitions ? 'rounded-tr-md' : 'rounded-r-md'} text-white text-sm break-words`}>
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
          {getDisplayData(claim).displayText}
        </p>)
      }
      {!validText ?
        (<div className="absolute z-10 bg-dark-danger rounded-md text-white text-sm">
          <p className="p-2">Please enter a valid constraint.</p>
          <p className="p-2">If your constraint doesn&apos;t need to reference probabilities, you can enter a logical formula in terms of the claim IDs. For example, you could enter the constraint &quot;(aaa and not bbb) implies (ccc or (ddd and eee))&quot; if aaa, bbb, ccc, ddd, and eee were all claim IDs. You may use &quot;and&quot;, &quot;or&quot;, &quot;not&quot;, and &quot;implies&quot; to build your logical formula. </p>
          <p className="p-2">More generally, if your constraint specifies a conditional probability, you can assign a conditional probability of a logical formula given another on the left hand side of an equation to a non-negative real number on the right hand side. For example, &quot;P(ccc or (ddd and eee) | aaa and not bbb) = 0.7&quot; is a valid constraint. You may use &quot;and&quot;, &quot;or&quot;, and &quot;not&quot; to specify your logical formulas. &quot;implies&quot; is disallowed to avoid confusion with conditional probability. </p>
          <p className="p-2">Finally, for the most generality, you can specify a linear (affine) constraint on the probabilities of logical formulas (conditional probabilities not allowed). For example, &quot;3.25*(P(aaa) + 0.8*P(bbb or ccc)) = 2 - P(not ddd or eee)&quot; would be valid (always include &quot;*&quot; for coefficient multiplication and put coefficients on the left).</p>
        </div>) : 
        null
      }
    </div>
  );
}

export function ClaimBox({claimID} : {claimID: string}) {
  const { claimLookup } = useClaimsContext();
  const claim = claimLookup[claimID];
  if (!claim) {
    throw new Error("claimID not present in claimLookup");
  }

  const acceptsDefinitions = 'definitionClaimIDs' in claim;
  const hasDefinitions = acceptsDefinitions && claim.definitionClaimIDs.length >= 1;

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: claimID});

  const style = {transition, transform: CSS.Translate.toString(transform)};

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`flex flex-col ${isDragging ? 'z-30' : ''}`}>
      <div
        className={`flex ${hasDefinitions ? 'rounded-tr-md rounded-tl-md rounded-bl-md' : 'rounded-md'} shadow-xl`}
        {...listeners}>
        <ClaimTab claim={claim} />
        <ClaimContentBox claim={claim} hasDefinitions={hasDefinitions} />
      </div>
      {acceptsDefinitions ?
        <div className="ml-14">
          <DefinitionList claim={claim} />
        </div> :
        null
      }
    </div>
  );
}
