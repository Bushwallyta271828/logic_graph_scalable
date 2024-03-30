import { ClaimList } from '@/app/_components/claimlist';
import CallAPI from '@/app/_lib/callapi';

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const claims = [{
    claimID: '1',
    author: 'some_userrrrrrrr',
    claimType: 'Text',
    text: responseText,
    definitions: ['2f48298fh', '23r83984934'],
  },{
    claimID: '10',
    author: 'some_user',
    claimType: 'Text',
    text: responseText,
    definitions: [],
  },{
    claimID: '100',
    author: 'ssssssome_user',
    claimType: 'Text',
    text: responseText,
    definitions: ['32090923432'],
  },{
    claimID: '1000',
    author: 'some_user',
    claimType: 'Text',
    text: responseText,
    definitions: ['32f398j4', '23jf289', '57575'],
  }];
  return (
    <ClaimList initialClaims={claims}/>
  );
}
