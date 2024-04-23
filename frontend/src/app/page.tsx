import { CallAPI } from '@/app/_lib/call-api';
import { NewClaimButton } from '@/app/_components/new-claim-button';
import { DebateLinks } from '@/app/_components/debate-links';
import { ClaimList } from '@/app/_components/claim-list';

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  console.log(responseText);
  
  return (
    <>
      <nav className="bg-dark-neutral text-white text-lg font-bold px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <NewClaimButton />
          <DebateLinks />
        </div>
      </nav>
      <ClaimList />
    </>
  );
}
