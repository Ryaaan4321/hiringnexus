"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserDetails, useUserId } from "@/hooks/user";
import { userLogout } from "@/app/actions/userserveraction";
import { FilterState } from "./SidebarII";
import { JobType } from "@/interfaces/jobinterface";
import {
  LayoutDashboard,
  Briefcase,
  User,
  Edit3,
  SlidersHorizontal,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Building2,
  DollarSign,
  Clock,
  Sparkles,
} from "lucide-react";

interface UserSidebarProps {
  onApply: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function UserSidebar({ onApply, isOpen = true, onClose }: UserSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { completeUser } = useUserDetails();
  const { userId } = useUserId();

  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    minExperience: null,
    salaryRange: null,
  });

  const [filterSectionOpen, setFilterSectionOpen] = useState(true);

  const clearFilters = () => {
    const cleared = {
      jobTypes: [],
      minExperience: null,
      salaryRange: null,
    };
    setFilters(cleared);
    onApply(cleared);
  };

  const handleJobTypeToggle = (type: JobType) => {
    const updated = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type];
    const newFilters = { ...filters, jobTypes: updated };
    setFilters(newFilters);
  };

  const handleExpSelect = (years: number | null) => {
    const newFilters = {
      ...filters,
      minExperience: filters.minExperience === years ? null : years,
    };
    setFilters(newFilters);
  };

  const handleSalaryRangeSelect = (min: number | null, max: number | null) => {
    const isSame =
      filters.salaryRange &&
      filters.salaryRange[0] === min &&
      filters.salaryRange[1] === max;
    const newFilters = {
      ...filters,
      salaryRange: isSame || min === null ? null : ([min, max] as [number, number]),
    };
    setFilters(newFilters);
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/logout", { method: "POST", cache: "no-store" });
      await userLogout();
      window.location.href = "/user/login";
    } catch (e) {
      window.location.href = "/user/login";
    }
  };

  const candidateInitials = completeUser?.name
    ? completeUser.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const navigationItems = [
    {
      title: "Live Opportunities",
      href: "/user/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/user/dashboard",
    },
    {
      title: "Candidate Profile",
      href: userId ? `/user/test-profile/${userId}` : "/user/dashboard",
      icon: User,
      active: pathname.startsWith("/user/test-profile"),
    },
    {
      title: "Edit Coordinates",
      href: "/user/edit-page",
      icon: Edit3,
      active: pathname === "/user/edit-page",
    },
  ];

  const availableJobTypes: JobType[] = [
    JobType.FULLTIME,
    JobType.REMOTE,
    JobType.CONTRACT,
    JobType.INTERNSHIP,
  ];

  const salaryOptions = [
    { label: "All Salaries", min: null, max: null },
    { label: "₹6 - ₹12 LPA", min: 600000, max: 1200000 },
    { label: "₹12 - ₹25 LPA", min: 1200000, max: 2500000 },
    { label: "₹25+ LPA", min: 2500000, max: 10000000 },
  ];

  const expOptions = [
    { label: "Any Exp", val: null },
    { label: "Fresher", val: 0 },
    { label: "1-3 Yrs", val: 1 },
    { label: "3-5 Yrs", val: 3 },
    { label: "5+ Yrs", val: 5 },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/95 flex flex-col justify-between min-h-screen sticky top-0 z-30 transition-all select-none">
      {/* Top Section: Brand & Primary Navigation */}
      <div className="p-5 space-y-6 overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <Link href="/user/dashboard" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              HX
            </span>
            <div>
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white block group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                HiringNexus
              </span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                ENGINEERING CRM
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links (CRM Style) */}
        <div className="space-y-1">
          <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider px-2 mb-1.5">
            [ WORKSPACE ]
          </span>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                  item.active
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-neutral-500" />
                  <span>{item.title}</span>
                </div>
                {item.active && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-white" />}
              </Link>
            );
          })}
        </div>

        {/* Quick Filters / Modality Section (like "Projects" in CRM image) */}
        <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              [ PIPELINE_FILTERS ]
            </span>
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
          </div>

          {/* Modality Chips */}
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono text-neutral-500 px-2">
              Modality:
            </span>
            <div className="flex flex-wrap gap-1 px-1">
              {availableJobTypes.map((type) => {
                const selected = filters.jobTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => handleJobTypeToggle(type)}
                    className={`px-2 py-1 text-[11px] font-mono rounded-md border transition-all cursor-pointer ${
                      selected
                        ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white font-semibold"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience Quick Filters */}
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono text-neutral-500 px-2">
              Min Experience:
            </span>
            <div className="grid grid-cols-2 gap-1 px-1">
              {expOptions.map((opt) => {
                const selected = filters.minExperience === opt.val;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleExpSelect(opt.val)}
                    className={`px-2 py-1 text-[11px] font-mono rounded-md border text-center transition-all cursor-pointer ${
                      selected
                        ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white font-semibold"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary Filter Quick Select */}
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono text-neutral-500 px-2">
              Compensation Range:
            </span>
            <div className="space-y-1 px-1">
              {salaryOptions.map((opt) => {
                const isSelected =
                  opt.min === null
                    ? filters.salaryRange === null
                    : filters.salaryRange &&
                      filters.salaryRange[0] === opt.min &&
                      filters.salaryRange[1] === opt.max;

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSalaryRangeSelect(opt.min, opt.max)}
                    className={`w-full px-2.5 py-1 text-[11px] font-mono rounded-md border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white font-semibold"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apply & Reset Buttons */}
          <div className="pt-2 space-y-1.5 px-1">
            <button
              onClick={() => onApply(filters)}
              className="hb-bracket w-full py-2 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer"
            >
              <span className="bracket">[ </span>
              <span>Apply Filters</span>
              <span className="bracket"> ]</span>
            </button>

            <button
              onClick={clearFilters}
              className="w-full py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              [ Clear Filter Rules ]
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Candidate Identity Card & Quick Logout */}
      <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={userId ? `/user/test-profile/${userId}` : "/user/dashboard"}
            className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity"
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-xs font-bold font-mono">
                {candidateInitials}
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-neutral-900" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-xs text-neutral-900 dark:text-white block truncate">
                {completeUser?.name || "Candidate"}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 block truncate">
                {completeUser?.profession || "Verified Engineer"}
              </span>
            </div>
          </Link>

          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="p-1.5 rounded-md text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
