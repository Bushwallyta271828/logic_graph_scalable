import { ClaimBoxProps } from "@/app/components/claimbox";
import { ClaimList } from "@/app/components/claimlist";
import CallAPI from "@/app/_lib/callapi";

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const claims = [{
    initialText: responseText,
    claimID: '1',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '10',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '100',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '1000',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '2',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '20',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '200',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '2000',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '3',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '30',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '300',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '3000',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '4',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '40',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '400',
    user: 'some_user'
  },{
    initialText: responseText,
    claimID: '4000',
    user: 'some_user'
  },];
  return (
    <ClaimList initialClaims={claims}/>
  );
}
