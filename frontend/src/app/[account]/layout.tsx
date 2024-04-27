import Link from 'next/link';

export default function DebateSelectionNavbar() {
  return (
    <>
      <nav className="bg-dark-neutral px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold flex gap-4">
            <Link href="/">
              <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                Debates
              </button>
            </Link>
          </div>
          <div className="text-white text-lg font-bold flex gap-4">
            <Link href="/">
              <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                Account
              </button>
            </Link>
            <Link href="/">
              <button className="bg-transparent hover:bg-medium-neutral px-2 py-1 rounded-md">
                Documentation
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
