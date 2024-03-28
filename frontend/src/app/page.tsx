import { ClaimBoxProps } from "@/app/components/claimbox";
import { ClaimList } from "@/app/components/claimlist";
import CallAPI from "@/app/_lib/callapi";

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const definitions = [{
    claimID: 'a',
    text: 'A moon is an object in orbit around another body.'
  },{
    claimID: 'b',
    text: 'Cheese is cheese.'
  }];
  const claims = [{
    initialText: responseText,
    claimID: '1',
    user: 'some_user',
    definitions: definitions
  },{
    initialText: responseText,
    claimID: '10',
    user: 'some_user',
    definitions: [],
  },{
    initialText: responseText,
    claimID: '100',
    user: 'some_user',
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
