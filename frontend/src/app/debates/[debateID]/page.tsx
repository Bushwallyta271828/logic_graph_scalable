import { Navbar } from '@/app/navbar';
import { NewClaimButton } from '@/app/debates/[debateID]/new-claim-button';
import { DebateLinks } from '@/app/debates/[debateID]/debate-links';
import { ClaimList } from '@/app/debates/[debateID]/claim-list';

export default function Claims() {
  return (
    <>
      <Navbar border={true}>
        <NewClaimButton />
        <DebateLinks />
      </Navbar>
      <ClaimList />
    </>
  );
}
