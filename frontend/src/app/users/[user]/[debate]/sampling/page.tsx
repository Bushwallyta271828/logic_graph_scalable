import { fetchAPI } from '@/app/_lib/api';
import { Navbar } from '@/app/navbar';
import { DebateLinks } from '@/app/users/[user]/[debate]/debate-links';

export default async function Sampling() {
  const responseText = await (await fetchAPI({path: "debates/"})).text();
  console.log(responseText);

  return (
    <>
      <Navbar border={true}>
        <div className="text-lg text-white font-bold">
          Sampling Controls
        </div>
        <DebateLinks />
      </Navbar>
      <div className="bg-red-800 text-white">
        <h1 className="text-xl">Sampling goes here!</h1>
      </div>
    </>
  );
}
