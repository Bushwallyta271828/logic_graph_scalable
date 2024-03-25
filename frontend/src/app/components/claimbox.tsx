import { unstable_noStore as noStore } from "next/cache";
import CallAPI from "@/app/_lib/callapi";

export default async function Claimbox() {
  const responseText = await (await CallAPI()).text();

  return (
    <div>
      <strong>Response:</strong>
      <pre>{responseText}</pre>
    </div>
  );
}
