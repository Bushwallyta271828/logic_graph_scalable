import { Navbar } from '@/app/navbar';
import { NewClaimButton } from '@/app/users/[user]/[debate]/new-claim-button';
import { DebateLinks } from '@/app/users/[user]/[debate]/debate-links';
import { ClaimList } from '@/app/users/[user]/[debate]/claim-list';

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
