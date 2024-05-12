import { Navbar } from '@/app/navbar';
import { DebateLinks } from '@/app/users/[user]/[debate]/debate-links';

export default function Dependencies() {
  return (
    <>
      <Navbar border={true}>
        <div className="text-lg text-white font-bold">
          Dependency Controls
        </div>
        <DebateLinks />
      </Navbar>
      <div className="bg-red-800 text-white">
        <h1 className="text-xl">Dependencies go here!</h1>
      </div>
    </>
  );
}
