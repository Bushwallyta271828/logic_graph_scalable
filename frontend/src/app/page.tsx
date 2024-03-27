import { ClaimBoxProps } from "@/app/components/claimbox";
import { ClaimList } from "@/app/components/claimlist";
import CallAPI from "@/app/_lib/callapi";

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  const claimBoxInfo: ClaimBoxProps = {
    initialText: responseText,
    claimID: '9372',
    user: 'some_user'
  };
  const claims = [claimBoxInfo, claimBoxInfo, claimBoxInfo, claimBoxInfo];
  return (
    <ClaimList claims={claims}/>
  );
}
