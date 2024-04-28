import { NewClaimButton } from '@/app/users/[user]/[debate]/new-claim-button';
import { DebateLinks } from '@/app/users/[user]/[debate]/debate-links';
import { ClaimList } from '@/app/users/[user]/[debate]/claim-list';

export default function Claims() {
  return (
    <>
      <nav className="bg-dark-neutral px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <NewClaimButton />
          <DebateLinks />
        </div>
      </nav>
      <ClaimList />
    </>
  );
}
