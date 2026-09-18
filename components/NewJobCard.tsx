"use client";

import Link from "next/link";
import { useState } from "react";
import type { jobinterface } from "@/interfaces/jobinterface";
import { useUserId } from "@/hooks/user";
import { visitedJobs } from "@/app/actions/userserveraction";
import {
  ExternalLink,
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
            className="home-card rounded-2xl p-5 hover:border-[#0a0e19] transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
          >
            {/* Card Header: Company Monogram + Title */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0a0e19] text-white flex items-center justify-center font-bold font-mono text-sm shadow-xs shrink-0">
                    {item.companyname?.[0]?.toUpperCase() || item.title?.[0]?.toUpperCase() || "H"}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-mono text-[#818181] block truncate uppercase tracking-wider">
                      {item.companyname}
                    </span>
                    <Link
                      href={`/user/job/${item.id}`}
                      className="font-semibold text-base text-[#0a0e19] hover:text-[#397554] transition-colors truncate block"
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>

                <Link
                  href={`/user/job/${item.id}`}
                  className="p-1 rounded-md text-[#818181] hover:text-[#0a0e19] hover:bg-[#f2f2f2] transition-colors shrink-0"
                  title="View Full Specification"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Description Preview */}
              {item.descreption && (
                <p className="text-xs text-[#636363] line-clamp-2 leading-relaxed mb-3">
                  {item.descreption}
                </p>
              )}

              {/* Modality Chips & Experience */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#f2f2f2] text-[#0a0e19] font-medium border border-[#e1e1e1]">
                  {item.experience === 0 ? "Fresher Friendly" : `${item.experience} yr${item.experience > 1 ? "s" : ""} exp`}
                </span>

                {item.jobTypes && item.jobTypes.length > 0 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-[#e1e1e1] text-[#636363]">
                    {item.jobTypes[0]}
                  </span>
                )}

                {item.location && (
                  <span className="text-[11px] font-mono text-[#818181] truncate max-w-[120px]">
                    · {item.location}
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer: Compensation + Direct Action */}
            <div className="pt-3 border-t border-[#e1e1e1] flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-mono text-[#818181] uppercase tracking-wider">
                  Compensation
                </span>
                <span className="text-sm font-bold font-mono text-[#0a0e19]">
                  {formatSalary(item.salary)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/user/job/${item.id}`}
                  className="home-btn home-btn-outline text-xs px-2.5 py-1"
                >
                  Details
                </Link>

                <Link
                  href={item.joblink || `/user/job/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleApplyClick(item.id, e)}
                  className="home-btn home-btn-fill text-xs px-3 py-1 flex items-center gap-1 cursor-pointer"
                >
                  <span>{isVisiting ? "Opening..." : "Apply"}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
