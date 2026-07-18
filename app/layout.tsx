import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Thirteen",
  description: "A curated visual archive for design references.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}