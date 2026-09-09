"use client";

import { useUserId } from "@/hooks/user";
import { jobinterface } from "@/interfaces/jobinterface";
import { visitedJobs } from "@/app/actions/userserveraction";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Copy,
} from "lucide-react";

export default function SingleJob({ job }: { job: jobinterface }) {
  const { userId } = useUserId();
  const [hasApplied, setHasApplied] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatSalary = (salary: number) => {
    if (!salary) return "Competitive";
    if (salary < 100) return `₹${salary} LPA`;
    return `₹${(salary / 100000).toFixed(1)} LPA`;
  };

  const handleApplyClick = async () => {
    if (userId && job.id) {
      try {
        await visitedJobs(job.id, userId);
        setHasApplied(true);
      } catch (e) {
        console.error("Failed to record job application telemetry:", e);
      }
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[ Back to Opportunities ]</span>
          </Link>
          <span className="text-xs font-mono text-neutral-400">
            [ ROLE_SPECIFICATION // {job.id.slice(0, 8)} ]
          </span>
        </div>

        {/* Hero Role Card */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  [ COMPANY // {job.companyname} ]
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  <span>VERIFIED</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Building2 className="w-4 h-4 text-neutral-400" />
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {job.companyname}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>[ Link Copied ]</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>[ Share Role ]</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Engineering Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                Compensation
              </span>
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                {formatSalary(job.salary)}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                Required Experience
              </span>
              <span className="text-base font-semibold text-neutral-900 dark:text-white">
                {job.experience === 0
                  ? "Fresher Friendly"
                  : `${job.experience} yr${job.experience > 1 ? "s" : ""}`}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                Role Modality
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {job.jobTypes && job.jobTypes.length > 0 ? (
                  job.jobTypes.map((type: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-mono text-neutral-500">Full-time</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                Hiring Lead
              </span>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white truncate block">
                {job.postedby?.name || "Direct Employer"}
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
              [ ROLE_MANDATE // TECHNICAL_SCOPE ]
            </span>
            <div className="rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/30 p-5">
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line font-sans">
                {job.descreption}
              </p>
            </div>
          </div>

          {/* Primary Action CTA Footer */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct application · No recruiter intermediation</span>
            </div>

            <Link
              href={job.joblink || "https://github.com/Ryaaan4321/hiringnexus"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className="hb-bracket inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer text-center"
            >
              <span className="bracket">[ </span>
              <span>{hasApplied ? "Open Application Portal Again" : "Apply on Official Portal"}</span>
              <ExternalLink className="w-4 h-4" />
              <span className="bracket"> ]</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}