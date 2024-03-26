import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">
            <Image
              src="@/app/icon.ico"
              width={10}
              height={10}
              alt="Logic Graph Logo"
            />
          </Link>
        </div>
        <div className="text-lg font-bold">
          <Link href="/documentation">Documentation</Link>
        </div>
      </div>
    </nav>
  );
}
