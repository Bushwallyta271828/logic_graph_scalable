import { NewClaimButton } from '@/app/_components/new-claim-button';
import { DebateLinks } from '@/app/_components/debate-links';
import { ClaimList } from '@/app/_components/claim-list';

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
