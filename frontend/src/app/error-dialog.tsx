'use client';

import { useState } from 'react';
import { StyledDialogBody } from '@/app/styled-dialog-body';


export function ErrorDialog({title, message}: {title: string, message: string}) {
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      className="relative z-50">
      <StyledDialogBody title={title}>
        <p>{message}</p>
        <div className="container mx-auto flex justify-between items-center p-2">
          <button
            className="bg-medium-neutral hover:bg-bright-neutral text-lg font-bold px-2 py-1 rounded-md"
            onClick={() => setDialogOpen(false)}>
            Okay
          </button>
        </div>
      </StyledDialogBody>
    </Dialog>
  );
}
