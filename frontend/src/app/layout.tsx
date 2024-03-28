import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "Logic Graph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar scrollbar-thumb-lime-500 scrollbar-track-orange-700">
      <body className="bg-neutral-800 scrollbar scrollbar-thumb-lime-500 scrollbar-track-orange-700">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
