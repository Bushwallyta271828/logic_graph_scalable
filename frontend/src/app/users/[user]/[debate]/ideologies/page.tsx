import { Navbar } from '@/app/navbar';
import { DebateLinks } from '@/app/users/[user]/[debate]/debate-links';

export default function Ideologies() {
  return (
    <>
      <Navbar border={true}>
        <div className="text-lg text-white font-bold">
          Ideology Controls
        </div>
        <DebateLinks />
      </Navbar>
      <div className="bg-red-800 text-white">
        <h1 className="text-xl">Ideologies go here!</h1>
      </div>
    </>
  );
}
