import { DebateLinks } from '@/app/_components/debate-links';

export default function Documentation() {
  return (
    <>
      <nav className="bg-dark-neutral px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            Documentation-specific content.
          </div>
          <DebateLinks />
        </div>
      </nav>
      <div className="bg-white text-black">
        <h1 className="text-xl">Welcome to the documentation!</h1>
        <p>Some content</p>
        <p>Some more content</p>
      </div>
    </>
  );
}
