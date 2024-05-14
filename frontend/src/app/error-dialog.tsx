'use client';

import { Dialog } from '@headlessui/react';


export function ErrorDialog({dialogOpen, setDialogOpen, title, message}: {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  title: string,
  message: string,
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
          <p>{message}</p>
          <div className="container mx-auto flex justify-between items-center p-2">
            <button
              className="bg-medium-neutral hover:bg-bright-neutral text-lg font-bold px-2 py-1 rounded-md"
              onClick={() => setDialogOpen(false)}>
              Okay
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
