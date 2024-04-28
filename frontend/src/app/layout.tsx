import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
      <body className="bg-medium-neutral min-h-screen">
        {children}
      </body>
    </html>
  );
}
