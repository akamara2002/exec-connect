import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exec-Connect: Unified AI Agents",
  description: "AI-powered diagnostics for CFO, CMO, COO, and CTO functions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

