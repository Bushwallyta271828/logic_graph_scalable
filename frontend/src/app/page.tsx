import QuoteApp from "@/app/components/claimlist";
import CallAPI from "@/app/_lib/callapi";

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  return (
    //<ClaimList initialText={responseText}/>
    <QuoteApp/>
  );
}
