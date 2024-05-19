export function FormCard({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="bg-dark-neutral p-4 rounded-md shadow-lg w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
