import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="bg-zinc-900 text-white px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-8">
          <div className="text-lg font-bold">
            <Link href="/">Claims</Link>
          </div>
          <div className="text-lg font-bold">
            <Link href="/">Analysis</Link>
          </div>
        </div>
        <div className="text-lg font-bold">
          <Link href="/documentation">Documentation</Link>
        </div>
      </div>
    </nav>
  );
}
