import { ClaimList } from '@/app/_components/claim-list';
import { CallAPI } from '@/app/_lib/call-api';

export default async function Home() {
  const responseText = await (await CallAPI()).text();
  console.log(responseText);
  
  //return (
  //  <ClaimList />
  //);
  return (<></>);
}
