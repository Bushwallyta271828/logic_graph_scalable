import { DebateLinks } from '@/app/_components/debate-links';

export default function Analysis() {
  return (
    <>
      <nav className="bg-dark-neutral px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg text-white font-bold">
            Dependency Controls
          </div>
          <DebateLinks />
        </div>
      </nav>
      <div className="bg-red-800 text-white">
        <h1 className="text-xl">Dependencies go here!</h1>
      </div>
    </>
  );
}
