import type { Metadata } from 'next';
import './globals.css';
import { UserContextProvider } from '@/app/_user_context/user-context';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <UserContextProvider>
      <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
        <body className="bg-medium-neutral min-h-screen">
          {children}
        </body>
      </html>
    </UserContextProvider>
  );
}
