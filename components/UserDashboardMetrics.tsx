"use client";

import { ShieldCheck, TrendingUp, Zap } from "lucide-react";

interface DashboardMetricsProps {
  totalJobs: number;
  activeFiltersCount: number;
}

export default function UserDashboardMetrics({
  totalJobs,
  activeFiltersCount,
}: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
      {/* Metric 1: Verified Pipeline Openings */}
      <div className="home-card rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#818181] uppercase tracking-wider">
            Pipeline Volume
          </span>
          <span className="w-2 h-2 rounded-full bg-[#397554] animate-pulse" />
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-normal home-serif text-[#0a0e19]">
            {totalJobs}
          </div>
          <p className="text-xs text-[#636363]">
            Active Verified Engineering Roles
          </p>
        </div>

        {/* Mini Decorative Activity Bars */}
        <div className="flex items-end gap-1.5 h-6 pt-1">
          {[40, 65, 30, 85, 55, 95, 70].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-[#f2f2f2] rounded-xs hover:bg-[#0a0e19] transition-colors"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Metric 2: Direct Employer Verification Gauge */}
      <div className="home-card rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#818181] uppercase tracking-wider">
            Direct Access
          </span>
          <ShieldCheck className="w-4 h-4 text-[#397554]" />
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-normal home-serif text-[#0a0e19]">
            100%
          </span>
          <span className="text-xs font-mono text-[#397554] font-medium">
            Zero Agency Spam
          </span>
        </div>

        <p className="text-xs text-[#636363] leading-relaxed">
          Applications link directly to hiring leads and engineering teams.
        </p>

        {/* Mini Progress Bar */}
        <div className="w-full bg-[#f2f2f2] rounded-full h-1.5 overflow-hidden">
          <div className="bg-[#397554] h-full rounded-full w-full" />
        </div>
      </div>

      {/* Metric 3: Compensation Benchmark */}
      <div className="home-card rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#818181] uppercase tracking-wider">
            Comp Benchmark
          </span>
          <TrendingUp className="w-4 h-4 text-[#818181]" />
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-normal home-serif text-[#0a0e19]">
            ₹18.5 LPA
          </div>
          <p className="text-xs text-[#636363]">
            Median Base Across Pipeline
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#818181]">
          <span className="text-[#0a0e19] font-medium">Min: ₹8 LPA</span>
          <span>·</span>
          <span className="text-[#0a0e19] font-medium">Max: ₹45+ LPA</span>
        </div>
      </div>

      {/* Metric 4: Proof-of-Work Verification Telemetry */}
      <div className="home-card rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#818181] uppercase tracking-wider">
            Verification Engine
          </span>
          <Zap className="w-4 h-4 text-[#397554]" />
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-normal home-serif text-[#0a0e19]">
            GitHub Telemetry
          </span>
        </div>

        <p className="text-xs text-[#636363] leading-relaxed">
          Real commits, merged PRs, and system design review proofs.
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#397554]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#397554]" />
          <span>Active Telemetry Sync</span>
        </div>
      </div>
    </div>
  );
}
