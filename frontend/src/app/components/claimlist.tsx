'use client';

import ClaimBox from "@/app/components/claimbox";

type ClaimListProps = {
  initialText: string;
};

export default function ClaimList({initialText} : ClaimListProps) {
  return (
    <div className="flex flex-col p-4 gap-4">
      <ClaimBox initialText={initialText}/>
      <ClaimBox initialText={initialText}/>
      <ClaimBox initialText={initialText}/>
      <ClaimBox initialText={initialText}/>
    </div>
  );
}
