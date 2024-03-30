import { Claim, TextClaim, DefinitionClaim } from '@/app/_types/claimtypes';
import { ClaimList } from '@/app/_components/claimlist';
import CallAPI from '@/app/_lib/callapi';

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const definitions = [{
    claimID: 'a29u2d829udiu32',
    text: 'A moon is an object in orbit around another body.'
  },{
    claimID: 'bf43f0394f03434f09hf28h9283h9',
    text: 'Cheese is that which is not not not not not not not not not not not not not not not not not not not not not not not not not not not not not not not not cheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeese.'
  }];
  const claims = [{
    initialText: responseText,
    claimID: '1',
    user: 'some_userrrrrrrr',
    definitions: definitions
  },{
    initialText: responseText,
    claimID: '10',
    user: 'some_user',
    definitions: [],
  },{
    initialText: responseText,
    claimID: '100',
    user: 'ssssssome_user',
    definitions: definitions
  },{
    initialText: responseText,
    claimID: '1000',
    user: 'some_user',
    definitions: definitions
  }];
  return (
    <ClaimList initialClaims={claims}/>
  );
}
