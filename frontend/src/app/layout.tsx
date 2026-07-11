import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GrowEasy AI CSV Importer",
  description: "AI-powered CSV Importer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}