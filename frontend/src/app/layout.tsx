import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/app/_components/navigation-bar";

export const metadata: Metadata = {
  title: "Logic Graph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-800">
      <body className="bg-neutral-800">
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
