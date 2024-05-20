'use client';

import { Dialog } from '@headlessui/react';


export function DeletionDialog({title, dialogOpen, setDialogOpen, onDelete, children}: {
  title: string,
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onDelete: () => void,
  children: React.ReactNode,
}) {
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      className="relative z-50">
      <div className="fixed inset-0 backdrop-brightness-50 backdrop-blur" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-lg rounded-md outline outline-2 outline-white bg-dark-neutral text-white p-2">
          <Dialog.Title className="text-center text-lg font-bold">{title}</Dialog.Title>
          {children}
          <p>Are you sure you wish to proceed?</p>
          <div className="container mx-auto flex justify-between items-center p-2">
            <button
              className="bg-medium-neutral hover:bg-bright-neutral text-lg font-bold px-2 py-1 rounded-md"
              onClick={() => setDialogOpen(false)}>
              Cancel
            </button>
            <button
              className="bg-medium-danger hover:bg-bright-danger text-lg font-bold px-2 py-1 rounded-md"
              onClick={onDelete}>
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
