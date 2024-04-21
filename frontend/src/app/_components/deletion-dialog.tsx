'use client';

import { Dialog } from '@headlessui/react';
import { Claim } from '@/app/_types/claim-types';


export function DeletionDialog({dialogOpen, setDialogOpen, claimsToDelete}: {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  claimsToDelete: Claim[],
}) {
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      className="relative z-50">
      <div className="fixed inset-0 backdrop-brightness-50 backdrop-blur" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-lg rounded-md outline outline-2 outline-white bg-dark-neutral text-white p-2">
          <Dialog.Title className="text-center text-lg font-bold">Deleting Additional Claims</Dialog.Title>
          <p>
            By deleting this claim, you will also be deleting the following claims which depend upon it:
          </p>
          <div className="p-2">
            { claimsToDelete.slice(0, 8).map((claimToDelete, index) => (
                <p className="text-nowrap truncate" key={index}>
                  {claimToDelete.claimID}: {claimToDelete.text}
                </p>
              ))
            }
            {(claimsToDelete.length > 8) ? <p key={8}>...</p> : null}
          </div>
          <p>Are you sure you wish to proceed?</p>
          <div className="min-w-full flex-row justify-between">
            <button className="bg-medium-neutral hover:bg-light-neutral text-lg font-bold px-2 py-1 rounded-md">
              Cancel
            </button>
            <button className="bg-medium-danger hover:bg-light-danger text-lg font-bold px-2 py-1 rounded-md">
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
