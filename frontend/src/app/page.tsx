import ClaimBox from "@/app/components/claimbox";
import CallAPI from "@/app/_lib/callapi";

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  return (
    <div className="flex flex-col p-4 gap-4">
      <ClaimBox text={responseText}/>
      <ClaimBox text={responseText}/>
      <ClaimBox text={responseText}/>
      <ClaimBox text={responseText}/>
    </div>
  );
}
