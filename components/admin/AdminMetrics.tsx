"use client";

import React from "react";
import { Briefcase, Users, ShieldCheck, Sparkles } from "lucide-react";

interface AdminMetricsProps {
  totalJobs?: number;
  totalUsers?: number;
  totalAdmins?: number;
  telemetryRatio?: string;
}

export default function AdminMetrics({
  totalJobs = 14,
  totalUsers = 128,
  totalAdmins = 2,
  telemetryRatio = "94.2%",
}: AdminMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs transition-all hover:border-[#cecece]">
        <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
          <span>Total Live Roles</span>
          <Briefcase className="w-4 h-4 text-[#0a0e19]" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">{totalJobs}</span>
          <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
        </div>
        <p className="mt-2 text-xs text-[#636363]">Directly indexable by candidates</p>
      </div>
      <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs transition-all hover:border-[#cecece]">
        <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
          <span>Registered Candidates</span>
          <Users className="w-4 h-4 text-[#0a0e19]" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">{totalUsers}</span>
          <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12 this week</span>
        </div>
        <p className="mt-2 text-xs text-[#636363]">Developers with indexed profiles</p>
      </div>
      <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs transition-all hover:border-[#cecece]">
        <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
          <span>Administrators</span>
          <ShieldCheck className="w-4 h-4 text-[#0a0e19]" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">{totalAdmins}</span>
          <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Super Root</span>
        </div>
        <p className="mt-2 text-xs text-[#636363]">Privileged platform managers</p>
      </div>
      <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs transition-all hover:border-[#cecece]">
        <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
          <span>Code Telemetry Match</span>
          <Sparkles className="w-4 h-4 text-[#0a0e19]" />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">{telemetryRatio}</span>
          <span className="text-xs font-mono text-[#636363]">High Accuracy</span>
        </div>
        <p className="mt-2 text-xs text-[#636363]">GitHub commit and systems proof</p>
      </div>
    </div>
  );
}
