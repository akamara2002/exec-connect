"use client";

import { usePathname } from "next/navigation";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const pathname = usePathname();
  
  // Marketing/public pages don't need sidebar
  const marketingPages = [
    "/",
    "/how-it-works",
    "/who-we-help",
    "/why-exec-connect",
    "/cxos",
    "/case-studies",
    "/insights",
    "/ecosystem",
    "/get-started",
    "/about",
    "/book-call",
    "/book-diagnostic",
  ];
  
  const isMarketingPage = marketingPages.includes(pathname || "") || 
    pathname?.startsWith("/book-cxo") ||
    pathname?.startsWith("/cxos/");
  
  if (isMarketingPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topbar />
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
