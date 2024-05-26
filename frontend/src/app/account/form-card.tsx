export function FormCard({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="p-4 flex flex-col gap-4 bg-dark-neutral rounded-md shadow-lg w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
