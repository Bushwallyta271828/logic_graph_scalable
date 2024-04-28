export function Navbar({border, children}: {border: boolean, children: ReactNode}) {
  return (
    <nav className={`bg-dark-neutral px-8 py-1 ${border ? 'border-t border-white' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        {children}
      </div>
    </nav>
  );
}
