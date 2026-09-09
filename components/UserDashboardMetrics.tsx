"use client";

import { ShieldCheck, TrendingUp, Briefcase, Zap } from "lucide-react";

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
      {/* Metric 1: Verified Pipeline Openings with Mini Visual Bars */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
            [ PIPELINE_VOLUME ]
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
            {totalJobs}
          </div>
          <p className="text-xs text-neutral-500 font-sans">
            Active Verified Engineering Roles
          </p>
        </div>

        {/* Mini Decorative Activity Bars */}
        <div className="flex items-end gap-1.5 h-6 pt-1">
          {[40, 65, 30, 85, 55, 95, 70].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-xs hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-colors"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Metric 2: Direct Employer Verification Gauge */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
            [ DIRECT_ACCESS ]
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
            100%
          </span>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            Zero Agency Spam
          </span>
        </div>

        <p className="text-xs text-neutral-500 font-sans leading-relaxed">
          Applications link directly to hiring leads and engineering teams.
        </p>

        {/* Mini Progress Bar */}
        <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-neutral-950 dark:bg-white h-full rounded-full w-full" />
        </div>
      </div>

      {/* Metric 3: Compensation Benchmark */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
            [ COMP_BENCHMARK ]
          </span>
          <TrendingUp className="w-3.5 h-3.5 text-neutral-400" />
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
            ₹18.5 LPA
          </div>
          <p className="text-xs text-neutral-500 font-sans">
            Median Base Across Pipeline
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
          <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Min: ₹8 LPA</span>
          <span>·</span>
          <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Max: ₹45+ LPA</span>
        </div>
      </div>

      {/* Metric 4: Proof-of-Work Verification Telemetry */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
            [ TELEMETRY_STATE ]
          </span>
          <Zap className="w-3.5 h-3.5 text-neutral-400" />
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
            Artifact Sync
          </div>
          <p className="text-xs text-neutral-500 font-sans">
            Evaluated by GitHub code artifacts
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
          <span>Active Filter Rules:</span>
          <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {activeFiltersCount} Rules
          </span>
        </div>
      </div>
    </div>
  );
}
