'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export function DebateName() {
  return (<p>{useSelectedLayoutSegment()}</p>);
}
