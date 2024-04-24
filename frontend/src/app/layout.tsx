import type { Metadata } from 'next';
import './globals.css';
import { ClaimsContextProvider } from '@/app/_contexts/claims-context';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
      <body className="bg-medium-neutral min-h-screen">
        <ClaimsContextProvider>
          {children}
        </ClaimsContextProvider>
      </body>
    </html>
  );
}
