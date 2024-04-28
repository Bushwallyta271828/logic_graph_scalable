export function Navbar({border, children}: {border: boolean, children: React.ReactNode}) {
  return (
    <nav className={`bg-dark-neutral px-8 py-1 ${border ? 'border-t border-bright-neutral' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        {children}
      </div>
    </nav>
  );
}
