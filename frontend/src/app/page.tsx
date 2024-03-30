import { ClaimList } from '@/app/_components/claimlist';
import CallAPI from '@/app/_lib/callapi';

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const claims = [{
    claimID: '1',
    author: 'alpha',
    claimType: 'Text',
    text: responseText,
    definitionClaimIDs: ['10', '100'],
  },{
    claimID: '10',
    author: 'beta',
    claimType: 'Definition',
    text: 'The moon is defined to be the moon.',
    definitionClaimIDs: [],
  },{
    claimID: '100',
    author: 'gamma',
    claimType: 'Definition',
    text: 'Cheese is defined to be whatever the moon is made out of.',
    definitionClaimIDs: ['10'],
  },{
    claimID: '1000',
    author: 'delta',
    claimType: 'ZerothOrder',
    formula: 12345,
  }];
  return (
    <ClaimList initialClaims={claims}/>
  );
}
