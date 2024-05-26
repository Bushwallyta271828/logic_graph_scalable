import './globals.css';
import type { Metadata } from 'next';
import { AccountContextProvider } from '@/app/_account_context/account-context';

export const metadata: Metadata = {
  title: 'Logic Graph',
};


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <AccountContextProvider>
      <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
        <body className="bg-medium-neutral">
          {children}
        </body>
      </html>
    </AccountContextProvider>
  );
}
