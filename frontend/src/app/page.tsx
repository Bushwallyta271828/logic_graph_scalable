import { ClaimList } from '@/app/_components/claim-list';
import CallAPI from '@/app/_lib/call-api';

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const claims = [{
    claimID: '1',
    author: 'alpha',
    claimType: 'text' as const,
    text: responseText,
    definitionClaimIDs: ['10', '100'],
  },{
    claimID: '10',
    author: 'beta',
    claimType: 'definition' as const,
    text: 'The moon is defined to be the moon.',
    definitionClaimIDs: [],
  },{
    claimID: '100',
    author: 'gamma',
    claimType: 'definition' as const,
    text: 'Cheese is defined to be whatever the moon is made out of.',
    definitionClaimIDs: ['10'],
  },{
    claimID: '1000',
    author: 'delta',
    claimType: 'zeroth-order' as const,
    formula: '12345',
  }];
  return (
    <ClaimList claims={claims}/>
  );
}
