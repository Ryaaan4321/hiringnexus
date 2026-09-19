"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserDetails, useUserId } from "@/hooks/user";
import { userLogout } from "@/app/actions/userserveraction";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  User,
  LogOut,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Check,
  Menu,
} from "lucide-react";

interface UserCRMTopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilterCount: number;
  onToggleFilters?: () => void;
  onToggleMobileMenu?: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function UserCRMTopBar({
  searchQuery,
  onSearchChange,
  activeFilterCount,
  onToggleFilters,
  onToggleMobileMenu,
  sortBy,
  onSortChange,
}: UserCRMTopBarProps) {
  const router = useRouter();
  const { completeUser } = useUserDetails();
  const { userId } = useUserId();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setIsAvatarOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await fetch("/api/logout", { method: "POST", cache: "no-store" });
      await userLogout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.href = "/login";
    }
  };

  const sortOptions = [
    { label: "Latest Roles", value: "latest" },
    { label: "Highest Salary", value: "salary_desc" },
    { label: "Lowest Experience", value: "exp_asc" },
  ];

  const candidateInitials = completeUser?.name
    ? completeUser.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "U";

  return (
    <div className="w-full pb-5 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e1e1e1]">
      <div className="flex items-center gap-2 flex-1 w-full max-w-xl">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden h-10 px-3 rounded-lg border border-[#cecece] bg-white text-[#0a0e19] hover:bg-[#f2f2f2] transition-colors cursor-pointer shadow-xs flex items-center justify-center shrink-0 gap-1.5"
            aria-label="Open Navigation and Filters"
            title="Open Navigation and Filters"
          >
            <Menu className="w-4 h-4" />
            <span className="text-xs font-mono hidden xs:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#0a0e19] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#818181]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search roles, tech, companies..."
            className="w-full h-10 pl-10 pr-12 rounded-lg border border-[#cecece] bg-white text-xs sm:text-sm text-[#0a0e19] placeholder:text-[#818181] focus:outline-2 focus:outline-[#0a0e19] transition-all shadow-xs"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#818181] border border-[#cecece] rounded bg-[#f2f2f2]">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
        <div className="relative" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="home-btn home-btn-glass text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#818181]" />
            <span className="hidden md:inline text-[#636363]">Sort:</span>
            <span className="font-semibold text-[#0a0e19]">
              {sortOptions.find((o) => o.value === sortBy)?.label || "Latest"}
            </span>
          </button>

          {isSortOpen && (
            <div className="home-card absolute right-0 mt-1.5 w-44 rounded-xl shadow-xl py-1 z-30 font-mono text-xs">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSortChange(opt.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-[#f2f2f2] transition-colors cursor-pointer ${sortBy === opt.value
                      ? "text-[#0a0e19] font-bold"
                      : "text-[#636363]"
                    }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check className="w-3.5 h-3.5 text-[#397554]" />}
                </button>
              ))}
            </div>
          )}
        </div>
        {onToggleFilters && (
          <button
            type="button"
            onClick={onToggleFilters}
            className="home-btn home-btn-glass text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#818181]" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#0a0e19] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        <div className="relative" ref={avatarRef}>
          <button
            type="button"
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="home-btn home-btn-glass p-1.5 flex items-center gap-2 cursor-pointer shadow-xs group"
            aria-label="Open User Profile Menu"
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-[#0a0e19] text-white flex items-center justify-center text-xs font-bold font-mono">
                {candidateInitials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#397554] border border-white" />
            </div>
            <div className="text-left hidden md:block">
              <span className="block text-xs font-medium text-[#0a0e19] truncate max-w-[100px]">
                {completeUser?.name?.split(" ")[0] || "Candidate"}
              </span>
            </div>
          </button>

          {isAvatarOpen && (
            <div className="home-card absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl shadow-xl p-4 z-40 space-y-3.5 border-[#e1e1e1]">
              <div className="flex items-center gap-3 pb-3 border-b border-[#e1e1e1]">
                <div className="w-10 h-10 rounded-full bg-[#0a0e19] text-white flex items-center justify-center text-sm font-bold font-mono shrink-0">
                  {candidateInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-[#0a0e19] truncate">
                      {completeUser?.name || "Verified Candidate"}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#397554] shrink-0" />
                  </div>
                  <span className="block text-xs text-[#818181] truncate font-mono">
                    {completeUser?.email || "candidate@hiringnexus.io"}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg border border-[#e1e1e1] bg-[#f9f9f9] space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[#636363]">
                  <span>Discipline:</span>
                  <span className="font-medium text-[#0a0e19] truncate max-w-[130px]">
                    {completeUser?.profession || "Developer"}
                  </span>
                </div>
                {completeUser?.ctc && (
                  <div className="flex items-center justify-between text-[#636363]">
                    <span>Target CTC:</span>
                    <span className="font-medium text-[#0a0e19]">
                      {completeUser.ctc}
                    </span>
                  </div>
                )}
                {completeUser?.location && (
                  <div className="flex items-center justify-between text-[#636363]">
                    <span>Base:</span>
                    <span className="font-medium text-[#0a0e19] truncate max-w-[130px]">
                      {completeUser.location}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-xs font-medium">
                <Link
                  href={userId ? `/user/test-profile/${userId}` : "/user/dashboard"}
                  onClick={() => setIsAvatarOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f2f2f2] text-[#0a0e19] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#818181]" />
                    <span>View Public Profile</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#818181]" />
                </Link>

                <Link
                  href="/user/edit-page"
                  onClick={() => setIsAvatarOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f2f2f2] text-[#0a0e19] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-3.5 h-3.5 text-[#818181]" />
                    <span>Edit Profile Details</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#818181]">EDIT</span>
                </Link>
              </div>
              <div className="pt-2 border-t border-[#e1e1e1]">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-xs font-medium cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400">EXIT</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
