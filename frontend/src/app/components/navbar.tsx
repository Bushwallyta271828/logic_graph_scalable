import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">Icon</Link>
        </div>
        <div className="text-lg font-bold">
          <Link href="/documentation">Documentation</Link>
        </div>
      </div>
    </nav>
  );
}
