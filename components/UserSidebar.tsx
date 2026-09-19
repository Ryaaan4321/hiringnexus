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
  User,
  Edit3,
  SlidersHorizontal,
  LogOut,
  X,
} from "lucide-react";

interface UserSidebarProps {
  onApply: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function UserSidebar({ onApply, isOpen = false, onClose }: UserSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { completeUser } = useUserDetails();
  const { userId } = useUserId();

  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    minExperience: null,
    salaryRange: null,
  });

  const clearFilters = () => {
    const cleared = {
      jobTypes: [],
      minExperience: null,
      salaryRange: null,
    };
    setFilters(cleared);
    onApply(cleared);
    if (onClose) onClose();
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

  const handleApply = () => {
    onApply(filters);
    if (onClose) onClose();
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/logout", { method: "POST", cache: "no-store" });
      await userLogout();
      window.location.href = "/login";
    } catch (e) {
      window.location.href = "/login";
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
      title: "Edit Profile",
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

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      
      <div className="p-5 space-y-6 overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#e1e1e1]">
          <Link
            href="/user/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z" fill="#0a0e19" opacity="0.9" />
              <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill="#0a0e19" />
            </svg>
            <div>
              <span className="font-semibold text-sm tracking-tight text-[#0a0e19] block group-hover:text-[#397554] transition-colors">
                HiringNexus
              </span>
              <span className="text-[10px] font-mono text-[#818181] uppercase tracking-wider block">
                Engineering CRM
              </span>
            </div>
          </Link>
        </div>

        
        <div className="space-y-1">
          <span className="block text-[10px] font-mono text-[#818181] uppercase tracking-wider px-2 mb-1.5">
            Workspace
          </span>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${item.active
                    ? "bg-[#0a0e19] text-white font-semibold shadow-xs"
                    : "text-[#636363] hover:bg-[#f2f2f2] hover:text-[#0a0e19]"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                {item.active && <span className="w-1.5 h-1.5 rounded-full bg-[#dbefdb]" />}
              </Link>
            );
          })}
        </div>

        
        <div className="space-y-4 pt-4 border-t border-[#e1e1e1]">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-mono text-[#818181] uppercase tracking-wider">
              Pipeline Filters
            </span>
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#818181]" />
          </div>

          
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono text-[#636363] px-2">
              Modality:
            </span>
            <div className="flex flex-wrap gap-1 px-1">
              {availableJobTypes.map((type) => {
                const selected = filters.jobTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleJobTypeToggle(type)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all cursor-pointer ${selected
                        ? "bg-[#0a0e19] text-white border-[#0a0e19] font-medium"
                        : "border-[#e1e1e1] bg-[#f9f9f9] text-[#636363] hover:bg-[#f2f2f2] hover:text-[#0a0e19]"
                      }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono text-[#636363] px-2">
              Min Experience:
            </span>
            <div className="grid grid-cols-2 gap-1 px-1">
              {expOptions.map((opt) => {
                const selected = filters.minExperience === opt.val;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleExpSelect(opt.val)}
                    className={`px-2 py-1 text-[11px] font-mono rounded-md border text-center transition-all cursor-pointer ${selected
                        ? "bg-[#0a0e19] text-white border-[#0a0e19] font-medium"
                        : "border-[#e1e1e1] bg-[#f9f9f9] text-[#636363] hover:bg-[#f2f2f2] hover:text-[#0a0e19]"
                      }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          
          <div className="space-y-1.5">
            <span className="block text-[11px] font-mono text-[#636363] px-2">
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
                    type="button"
                    onClick={() => handleSalaryRangeSelect(opt.min, opt.max)}
                    className={`w-full px-2.5 py-1 text-[11px] font-mono rounded-md border text-left flex items-center justify-between transition-all cursor-pointer ${isSelected
                        ? "bg-[#0a0e19] text-white border-[#0a0e19] font-medium"
                        : "border-[#e1e1e1] bg-[#f9f9f9] text-[#636363] hover:bg-[#f2f2f2] hover:text-[#0a0e19]"
                      }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#dbefdb]" />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="pt-2 space-y-1.5 px-1">
            <button
              type="button"
              onClick={handleApply}
              className="home-btn home-btn-fill w-full text-xs py-2 cursor-pointer"
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="home-btn home-btn-outline w-full text-xs py-1.5 cursor-pointer text-[#636363]"
            >
              Clear Filter Rules
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-[#e1e1e1] bg-[#f9f9f9]">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={userId ? `/user/test-profile/${userId}` : "/user/dashboard"}
            onClick={onClose}
            className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity"
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#0a0e19] text-white flex items-center justify-center text-xs font-bold font-mono">
                {candidateInitials}
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#397554] border border-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-xs text-[#0a0e19] block truncate">
                {completeUser?.name || "Candidate"}
              </span>
              <span className="text-[10px] font-mono text-[#818181] block truncate">
                {completeUser?.profession || "Verified Engineer"}
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            title="Sign Out"
            className="p-1.5 rounded-md text-[#818181] hover:text-red-600 hover:bg-[#f2f2f2] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-[#e1e1e1] bg-white flex-col justify-between min-h-screen sticky top-0 z-30 select-none">
        {sidebarContent}
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between lg:hidden transition-transform duration-300 ease-in-out select-none ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e1e1e1] bg-[#fcfcfc] shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-[#0a0e19]">HiringNexus</span>
            <span className="text-[10px] font-mono text-[#818181] uppercase tracking-wider">
              Filters & Nav
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#636363] hover:text-[#0a0e19] hover:bg-[#f2f2f2] transition-colors cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
