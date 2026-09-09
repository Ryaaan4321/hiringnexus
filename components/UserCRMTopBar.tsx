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
  Briefcase,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";

interface UserCRMTopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilterCount: number;
  onToggleFilters?: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function UserCRMTopBar({
  searchQuery,
  onSearchChange,
  activeFilterCount,
  onToggleFilters,
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

  // Close dropdowns on outside click
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
      window.location.href = "/user/login";
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.href = "/user/login";
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
    <div className="w-full pb-6 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 border-b border-neutral-200/80 dark:border-neutral-800/80">
      {/* Search Input Bar (CRM style) */}
      <div className="relative flex-1 max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search roles, technologies, companies..."
          className="w-full h-10 pl-10 pr-12 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all shadow-xs"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-50 dark:bg-neutral-800">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Sort, Filter Button & Interactive User Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto">
        {/* Sort Trigger */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden md:inline">Sort:</span>
            <span className="font-semibold">
              {sortOptions.find((o) => o.value === sortBy)?.label || "Latest"}
            </span>
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg py-1 z-30 font-mono text-xs">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
                    sortBy === opt.value
                      ? "text-neutral-900 dark:text-white font-bold"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters Toggle Button */}
        {onToggleFilters && (
          <button
            onClick={onToggleFilters}
            className="h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        {/* Interactive Avatar "Magic" Dropdown */}
        <div className="relative" ref={avatarRef}>
          <button
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="h-10 pl-2 pr-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-center gap-2 cursor-pointer shadow-xs group"
            aria-label="Open User Profile Menu"
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-xs font-bold font-mono">
                {candidateInitials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-neutral-900" />
            </div>
            <div className="text-left hidden md:block">
              <span className="block text-xs font-medium text-neutral-900 dark:text-white truncate max-w-[100px]">
                {completeUser?.name?.split(" ")[0] || "Candidate"}
              </span>
            </div>
          </button>

          {/* Magic Dropdown Modal */}
          {isAvatarOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl p-4 z-40 space-y-3.5">
              {/* User Identity Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-sm font-bold font-mono shrink-0">
                  {candidateInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white truncate">
                      {completeUser?.name || "Verified Candidate"}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <span className="block text-xs text-neutral-500 truncate font-mono">
                    {completeUser?.email || "candidate@hiringnexus.io"}
                  </span>
                </div>
              </div>

              {/* Coordinates Pill Details */}
              <div className="p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Discipline:</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-200 truncate max-w-[130px]">
                    {completeUser?.profession || "Developer"}
                  </span>
                </div>
                {completeUser?.ctc && (
                  <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Target CTC:</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-200">
                      {completeUser.ctc}
                    </span>
                  </div>
                )}
                {completeUser?.location && (
                  <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Base:</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-200 truncate max-w-[130px]">
                      {completeUser.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="space-y-1 font-mono text-xs">
                <Link
                  href={userId ? `/user/test-profile/${userId}` : "/user/dashboard"}
                  onClick={() => setIsAvatarOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <span>View Public Profile</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </Link>

                <Link
                  href="/user/edit-page"
                  onClick={() => setIsAvatarOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Edit Coordinates</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">[ EDIT ]</span>
                </Link>
              </div>

              {/* Logout Trigger */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-mono text-xs cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
                  </div>
                  <span className="text-[10px] text-red-400">[ END_SESSION ]</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
