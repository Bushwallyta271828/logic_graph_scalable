'use client';

import { Dialog } from '@headlessui/react'

export function DeletionDialog({dialogOpen, setDialogOpen}: {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setDialogOpen(false)}>Deactivate</button>
        <button onClick={() => setDialogOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
}
