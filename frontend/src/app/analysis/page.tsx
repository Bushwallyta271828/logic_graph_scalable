import { DebateLinks } from '@/app/_components/debate-links';

export default function Analysis() {
  return (
    <>
      <nav className="bg-dark-neutral px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            Analysis-specific content
          </div>
          <DebateLinks />
        </div>
      </nav>
      <div className="bg-red-800 text-white">
        <h1 className="text-xl">Welcome to the analysis of the claims!</h1>
      </div>
    </>
  );
}
