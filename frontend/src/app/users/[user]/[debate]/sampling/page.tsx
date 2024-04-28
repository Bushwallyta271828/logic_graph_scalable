import { CallAPI } from '@/app/_lib/call-api';
import { DebateLinks } from '@/app/users/[user]/[debate]/debate-links';

export default async function Sampling() {
  const responseText = await (await CallAPI()).text();
  console.log(responseText);

  return (
    <>
      <nav className="bg-dark-neutral px-8 py-1">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg text-white font-bold">
            Sampling Controls
          </div>
          <DebateLinks />
        </div>
      </nav>
      <div className="bg-red-800 text-white">
        <h1 className="text-xl">Sampling goes here!</h1>
      </div>
    </>
  );
}
