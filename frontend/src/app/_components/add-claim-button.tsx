'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
//import { addClaim } from '@app/_contexts/claims-context';

//export function AddClaimButton() {
//  return (
//    <button className="bg-transparent hover:bg-zinc-700 px-2 py-1 rounded">
//      New Claim
//    </button>
//  );
//}


export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef : RefObject<HTMLDivElement | null> = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        New Claim
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          <a
            key={index}
            onClick={console.log('text')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Text Claim
          </a>
          <a
            key={index}
            onClick={console.log('definition')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Definition Claim
          </a>
          <a
            key={index}
            onClick={console.log('zeroth-order')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Zeroth Order Claim
          </a>
        </div>
      )}
    </div>
  );
};
