import { Navbar } from '@/app/navbar';
import { DebateLinks } from '@/app/debates/[debateID]/debate-links';

export default function Sampling() {
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
