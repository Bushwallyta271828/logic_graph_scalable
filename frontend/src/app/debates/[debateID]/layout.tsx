import { DebateContextProvider } from '@/app/debates/[debateID]/_debate_context/debate-context';

export default function ContextWrapper({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <DebateContextProvider>
      {children}
    </DebateContextProvider>
  );
}
