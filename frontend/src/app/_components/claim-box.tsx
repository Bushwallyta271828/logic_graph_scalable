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
        <Menu.Items className={`absolute w-40 origin-top-right z-10 bg-transparent outline-none rounded-md shadow-xl text-white text-sm font-normal`}>
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
    <div className={`${!validText ? 'bg-dark-danger' : claim.claimType === 'text' ? 'bg-dark-text' : claim.claimType === 'definition' ? 'bg-dark-definition' : 'bg-dark-zeroth-order'} flex-1 min-w-0 ${hasDefinitions ? 'rounded-tr-md' : 'rounded-r-md'} text-white text-sm break-words`}>
      {editing ? (
        <p
          ref={textRef}
          contentEditable="plaintext-only"
          className="w-full h-full p-2 outline-none"
          onInput={(e) => setText(e.currentTarget.innerText)}
          onBlur={handleBlur}>
          {claim.text}
        </p>
      ) : (
        <p className="w-full h-full p-2" onClick={() => setEditing(true)}>
          {getDisplayData(claim).displayText}
        </p>
      )}
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
      className={`flex flex-col ${isDragging ? 'z-20' : ''}`}>
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
