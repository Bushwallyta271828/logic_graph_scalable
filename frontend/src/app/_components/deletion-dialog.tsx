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
            By deleting this claim, you will also be deleting the following claims which depend on it:
          </p>
          <div className="p-2">
            { claimsToDelete.slice(0, 10).map((claimToDelete, index) => (
                <p key={index}>
                  {claimToDelete.claimID}: {claimToDelete.text}
                </p>
              ))
            }
            {(claimsToDelete.length > 10) ? <p key={10}>...</p> : null}
          </div>
          <p>Are you sure you want to proceed?</p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
