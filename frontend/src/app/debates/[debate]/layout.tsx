import { DebateContextProvider } from '@/app/users/[user]/[debate]/_debate_context/debate-context';

export default function ContextWrapper({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <DebateContextProvider>
      {children}
    </DebateContextProvider>
  );
}
