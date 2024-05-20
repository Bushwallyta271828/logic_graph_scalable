'use client';

import { Claim } from '@/app/debates/[debateID]/_debate_context/claim-types';
import { useDebateContext } from '@/app/debates/[debateID]/_debate_context/debate-context';
import { DeletionDialog } from '@/app/deletion-dialog';


export function ClaimDeletionDialog({dialogOpen, setDialogOpen, claim, additionalClaims}: {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  claim: Claim,
  additionalClaims: Claim[],
}) {
  const { deleteClaim, getDisplayData } = useDebateContext();

  const claimsDisplay = additionalClaims.slice(0, 8).map((additionalClaim) => {
    const {displayText, validText} = getDisplayData(additionalClaim);
    if (validText === true) {return additionalClaim.claimID + ": " + displayText;}
    else {return additionalClaim.claimID + ": " + additionalClaim.text;}
  });
  if (additionalClaims.length > 8) {claimsDisplay.push("...");}

  return (
    <DeletionDialog
      title="Deleting Additional Claims"
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      onDelete={() => deleteClaim(claim)}
      dataNoDnd="true">
      <p>
        By deleting this claim, you will also be deleting the following claims which depend upon it:
      </p>
      <div className="p-2">
        { claimsDisplay.map((claimDisplay, index) => (
            <p className="text-nowrap truncate" key={index}>{claimDisplay}</p>
          ))
        }
      </div>
    </DeletionDialog>
  );
}
