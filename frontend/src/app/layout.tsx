import type { Metadata } from 'next';
import './globals.css';
import { MathJaxContext } from 'better-react-mathjax';
import { ClaimsContextProvider } from '@/app/_contexts/claims-context';
import { NavigationBar } from '@/app/_components/navigation-bar';

export const metadata: Metadata = {
  title: 'Logic Graph',
};

const mathJaxConfig = {
  loader: { load: ['input/asciimath'] },
  asciimath: { delimiters: [["$$","$$"]] },
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-dark-neutral scrollbar-thumb-medium-neutral">
      <body className="bg-medium-neutral">
        <MathJaxContext config={mathJaxConfig}>
          <ClaimsContextProvider>
            <NavigationBar />
            {children}
          </ClaimsContextProvider>
        </MathJaxContext>
      </body>
    </html>
  );
}
