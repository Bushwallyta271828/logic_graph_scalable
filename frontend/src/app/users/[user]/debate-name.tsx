'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export function DebateName() {
  return (
    <p className="text-white px-2 py-1">
      {useSelectedLayoutSegment()}
    </p>
  );
}
