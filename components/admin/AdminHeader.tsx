"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut, Plus, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { useAdminData } from "@/hooks/admin";

export default function AdminHeader() {
  const router = useRouter();
  const { admin, loading } = useAdminData();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.auth.logout();
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e1e1e1] bg-[#f9f9f9]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:scale-105">
              <path d="M4 4L11 12L4 20H8L15 12L8 4H4Z" fill="#0a0e19" />
              <path d="M12 4L19 12L12 20H16L23 12L16 4H12Z" fill="#0a0e19" opacity="0.35" />
            </svg>
            <span className="font-serif text-lg tracking-tight font-medium text-[#0a0e19]">
              HiringNexus
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#cecece] bg-white text-xs font-mono text-[#636363]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Super Admin Console
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/createjob"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#0a0e19] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Role</span>
          </Link>

          <Link
            href="/recruiter/dashboard"
            className="hidden md:inline-flex items-center gap-1 text-xs font-mono text-[#636363] hover:text-[#0a0e19] border border-[#e1e1e1] bg-white px-2.5 py-1.5 rounded-md transition-colors"
          >
            <span>HR View</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md border border-[#e1e1e1] bg-white text-xs font-mono text-[#0a0e19]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{loading ? "admin..." : admin?.username || "SuperAdmin"}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#cecece] bg-white px-3 py-1.5 text-xs font-medium text-[#636363] transition-colors hover:border-[#0a0e19] hover:text-[#0a0e19]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? "..." : "Sign Out"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
