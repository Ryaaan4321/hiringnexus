"use client";

import Link from "next/link";
import { useState } from "react";
import type { jobinterface } from "@/interfaces/jobinterface";
import { useUserId } from "@/hooks/user";
import { visitedJobs } from "@/app/actions/userserveraction";
import {
  Building2,
  ExternalLink,
  Calendar,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function JobCards({
  job,
  isLoggedIn = true,
}: {
  job: jobinterface[];
  isLoggedIn?: boolean;
}) {
  const { userId } = useUserId();
  const [visitingJobs, setVisitingJobs] = useState<Set<string>>(new Set());

  const formatSalary = (salary: number) => {
    if (!salary) return "Competitive";
    if (salary < 100) return `₹${salary} LPA`;
    return `₹${(salary / 100000).toFixed(0)} LPA`;
  };

  const handleApplyClick = async (jobId: string, e: React.MouseEvent) => {
    if (!userId) return;
    setVisitingJobs((prev) => new Set(prev).add(jobId));
    try {
      await visitedJobs(jobId, userId);
    } catch (err) {
      console.error("Application telemetry error:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {job.map((item) => {
        const isVisiting = visitingJobs.has(item.id);

        return (
          <div
            key={item.id}
            className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
          >
            {/* Card Header: Company Monogram + Title */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold font-mono text-sm shadow-xs shrink-0">
                    {item.companyname?.[0]?.toUpperCase() || item.title?.[0]?.toUpperCase() || "H"}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-mono text-neutral-400 block truncate uppercase tracking-wider">
                      {item.companyname}
                    </span>
                    <Link
                      href={`/user/job/${item.id}`}
                      className="font-bold text-base text-neutral-900 dark:text-white hover:underline underline-offset-2 truncate block"
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>

                <Link
                  href={`/user/job/${item.id}`}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                  title="View Full Specification"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Description Preview */}
              {item.descreption && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed font-sans mb-3">
                  {item.descreption}
                </p>
              )}

              {/* Modality Chips & Experience */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                  {item.experience === 0 ? "Fresher Friendly" : `${item.experience} yr${item.experience > 1 ? "s" : ""} exp`}
                </span>

                {item.jobTypes && item.jobTypes.length > 0 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {item.jobTypes[0]}
                  </span>
                )}

                {item.location && (
                  <span className="text-[11px] font-mono text-neutral-500 truncate max-w-[120px]">
                    · {item.location}
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer: Compensation + Direct Action */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  Compensation
                </span>
                <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                  {formatSalary(item.salary)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/user/job/${item.id}`}
                  className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  [ Details ]
                </Link>

                <Link
                  href={item.joblink || `/user/job/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleApplyClick(item.id, e)}
                  className="hb-bracket px-3 py-1.5 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span className="bracket">[ </span>
                  <span>{isVisiting ? "Opening..." : "Apply"}</span>
                  <ExternalLink className="w-3 h-3" />
                  <span className="bracket"> ]</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
