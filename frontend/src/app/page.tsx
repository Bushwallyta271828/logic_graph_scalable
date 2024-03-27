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
  },];
  return (
    <ClaimList initialClaims={claims}/>
  );
}
