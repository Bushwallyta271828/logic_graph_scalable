'use client';

import { Dialog } from '@headlessui/react';
import { Claim } from '@/app/_types/claim-types';
import { useClaimsContext } from '@/app/_contexts/claims-context';


export function DeletionDialog({dialogOpen, setDialogOpen, claim, additionalClaims}: {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  claim: Claim,
  additionalClaims: Claim[],
}) {
  const { deleteClaim, getDisplayData } = useClaimsContext();

  const claimsDisplay = additionalClaims.slice(0, 8).map((additionalClaim) => {
    const {displayText, validText} = getDisplayData(additionalClaim);
    if (validText === true) {return additionalClaim.claimID + ": " + displayText;}
    else {return additionalClaim.claimID + ": " + additionalClaim.text;}
  });
  if (additionalClaims.length > 8) {claimsDisplay.push("...");}

  return (
    <Dialog
      data-no-dnd="true"
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
            { claimsDisplay.map((claimDisplay, index) => (
                <p className="text-nowrap truncate" key={index}>claimDisplay</p>
              ));
            }
          </div>
          <p>Are you sure you wish to proceed?</p>
          <div className="container mx-auto flex justify-between items-center p-2">
            <button
              className="bg-medium-neutral hover:bg-bright-neutral text-lg font-bold px-2 py-1 rounded-md"
              onClick={() => setDialogOpen(false)}>
              Cancel
            </button>
            <button
              className="bg-medium-danger hover:bg-bright-danger text-lg font-bold px-2 py-1 rounded-md"
              onClick={() => deleteClaim(claim)}>
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
