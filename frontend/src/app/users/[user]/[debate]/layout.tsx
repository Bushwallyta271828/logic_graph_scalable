import { ClaimsContextProvider } from '@/app/_contexts/claims-context';

export default function ContextWrapper({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <ClaimsContextProvider>
      {children}
    </ClaimsContextProvider>
  );
}
