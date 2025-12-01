"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, History, MessageCircle, TrendingUp, Users, Settings, Code } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  
  // Determine which agent section we're in
  const getNavItems = () => {
    if (pathname?.startsWith("/cfo")) {
      return [
        { href: "/cfo/diagnostic", label: "CFO Diagnostic", icon: FileText },
        { href: "/cfo/history", label: "Analyses History", icon: History },
        { href: "/cfo/chat", label: "AI-CFO Chat", icon: MessageCircle },
      ];
    } else if (pathname?.startsWith("/cmo")) {
      return [
        { href: "/cmo/diagnostic", label: "CMO Diagnostic", icon: FileText },
        { href: "/cmo/analysis", label: "Analyses History", icon: History },
        { href: "/cmo/chat", label: "AI-CMO Chat", icon: MessageCircle },
      ];
    } else if (pathname?.startsWith("/coo")) {
      return [
        { href: "/coo/diagnostic", label: "COO Diagnostic", icon: FileText },
        { href: "/coo/analysis", label: "Analyses History", icon: History },
        { href: "/coo/chat", label: "AI-COO Chat", icon: MessageCircle },
      ];
    } else if (pathname?.startsWith("/cto")) {
      return [
        { href: "/cto/diagnostic", label: "CTO Diagnostic", icon: FileText },
        { href: "/cto/analysis", label: "Analyses History", icon: History },
        { href: "/cto/chat", label: "AI-CTO Chat", icon: MessageCircle },
      ];
    }
    return [];
  };

  const navItems = getNavItems();
  const agentLinks = [
    { href: "/cfo", label: "AI-CFO", icon: TrendingUp, color: "from-blue-500 to-indigo-600" },
    { href: "/cmo", label: "AI-CMO", icon: Users, color: "from-purple-500 to-pink-600" },
    { href: "/coo", label: "AI-COO", icon: Settings, color: "from-green-500 to-teal-600" },
    { href: "/cto", label: "AI-CTO", icon: Code, color: "from-orange-500 to-red-600" },
  ];

  if (navItems.length === 0) {
    // Show agent selection on home page
    return (
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 min-h-[calc(100vh-73px)] shadow-lg">
        <nav className="p-4 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Dashboard</span>
          </Link>
          <div className="pt-4 border-t border-gray-200">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Agents</p>
            {agentLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    );
  }

  // Show agent-specific navigation
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-1">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 mb-4"
        >
          <LayoutDashboard className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Home</span>
        </Link>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
