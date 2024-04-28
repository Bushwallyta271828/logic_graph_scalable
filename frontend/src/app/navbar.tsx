export function Navbar({children}: {children: ReactNode}) {
  return (
    <nav className="bg-dark-neutral px-8 py-1">
      <div className="container mx-auto flex justify-between items-center">
        {children}
      </div>
    </nav>
  );
}
