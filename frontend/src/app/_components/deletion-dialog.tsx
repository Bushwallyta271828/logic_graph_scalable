'use client';

import { Dialog } from '@headlessui/react';
import { Claim } from '@/app/_types/claim-types';


export function DeletionDialog({dialogOpen, setDialogOpen, claimsToDelete}: {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  claimsToDelete: Claim[],
}) {
  //Assumes claimsToDelete doesn't have any duplicates --
  //otherwise we could get duplicate keys!
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-bright-neutral text-white p-2">
          <Dialog.Title>Deleting Additional Claims</Dialog.Title>
          <p>
            By deleting this claim, you will also be deleting the following claims which depend on it:
          </p>
          {claimsToDelete.map((claimToDelete) => (<p key={claimToDelete.claimID}>{claimToDelete.text}</p>))}
          <p>Are you sure you want to proceed?</p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
