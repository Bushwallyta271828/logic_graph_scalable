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
    <html lang="en">
      <body className="bg-neutral-800">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
