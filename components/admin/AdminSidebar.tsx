"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Users,
  ShieldAlert,
  BarChart3,
  Settings,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      title: "Manage Roles",
      href: "/admin/jobs",
      icon: Briefcase,
      active: pathname === "/admin/jobs",
    },
    {
      title: "Create Role",
      href: "/admin/createjob",
      icon: PlusCircle,
      active: pathname === "/admin/createjob",
    },
    {
      title: "Candidate Directory",
      href: "/admin/users",
      icon: Users,
      active: pathname.startsWith("/admin/users"),
    },
    {
      title: "Admin Roster",
      href: "/admin/adminlist",
      icon: ShieldAlert,
      active: pathname === "/admin/adminlist",
    },
    {
      title: "Platform Telemetry",
      href: "/admin/report",
      icon: BarChart3,
      active: pathname === "/admin/report",
    },
  ];

  return (
    <aside className="w-full md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-[#e1e1e1] bg-[#f9f9f9] p-4">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#818181]">
          Administration
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-mono transition-colors whitespace-nowrap ${
                  item.active
                    ? "bg-[#0a0e19] text-white font-medium shadow-xs"
                    : "text-[#636363] hover:bg-[#eaeaea] hover:text-[#0a0e19]"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.active ? "text-white" : "text-[#818181]"}`} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden md:block mt-8 pt-6 border-t border-[#e1e1e1] px-3 space-y-2 text-[11px] font-mono text-[#818181]">
        <div>System Version: v2.4</div>
        <div>Access Level: Root Admin</div>
      </div>
    </aside>
  );
}
