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
    <div className="min-h-[calc(100vh-4rem)] bg-[#f9f9f9] text-[#0a0e19] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#636363] hover:text-[#0a0e19] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Opportunities</span>
          </Link>
          <span className="text-[11px] sm:text-xs font-mono text-[#818181] uppercase tracking-wider">
            Role Specification · {job.id.slice(0, 8)}
          </span>
        </div>

        
        <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#e1e1e1] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#636363] uppercase tracking-wider">
                  {job.companyname}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] border border-[#b8dfb8]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Direct Post</span>
                </span>
              </div>
              <h1 className="home-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#0a0e19]">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#636363]">
                <Building2 className="w-4 h-4 text-[#818181]" />
                <span className="font-medium text-[#0a0e19]">
                  {job.companyname}
                </span>
                {job.location && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#818181]" />
                      {job.location}
                    </span>
                  </>
                )}
              </div>
            </div>

            
            <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="home-btn home-btn-glass text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#397554]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Share Role</span>
                  </>
                )}
              </button>
            </div>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] space-y-1">
              <span className="font-mono text-[10px] text-[#818181] uppercase tracking-wider block">
                Compensation
              </span>
              <span className="home-serif text-xl font-normal text-[#0a0e19] block">
                {formatSalary(job.salary)}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] space-y-1">
              <span className="font-mono text-[10px] text-[#818181] uppercase tracking-wider block">
                Required Experience
              </span>
              <span className="home-serif text-xl font-normal text-[#0a0e19] block">
                {job.experience === 0
                  ? "Fresher Friendly"
                  : `${job.experience} yr${job.experience > 1 ? "s" : ""}`}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] space-y-1">
              <span className="font-mono text-[10px] text-[#818181] uppercase tracking-wider block">
                Role Modality
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {job.jobTypes && job.jobTypes.length > 0 ? (
                  job.jobTypes.map((type: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-medium text-[#0a0e19]"
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-mono text-[#636363]">Full-time</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] space-y-1">
              <span className="font-mono text-[10px] text-[#818181] uppercase tracking-wider block">
                Hiring Lead
              </span>
              <span className="text-sm font-semibold text-[#0a0e19] truncate block">
                {job.postedby?.name || "Direct Employer"}
              </span>
            </div>
          </div>

          
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs text-[#636363] uppercase tracking-wider block">
              Role Mandate · Technical Scope
            </span>
            <div className="rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] p-6">
              <p className="text-sm text-[#0a0e19]/80 leading-relaxed whitespace-pre-line font-sans">
                {job.descreption}
              </p>
            </div>
          </div>

          
          <div className="pt-4 border-t border-[#e1e1e1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#636363]">
              <ShieldCheck className="w-4 h-4 text-[#397554] shrink-0" />
              <span>Direct application · No recruiter intermediation</span>
            </div>

            <Link
              href={job.joblink || "https://github.com/Ryaaan4321/hiringnexus"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className="home-btn home-btn-fill px-7 py-3 text-sm font-medium inline-flex items-center justify-center gap-2 text-center w-full sm:w-auto min-h-[44px]"
            >
              <span>{hasApplied ? "Open Application Portal Again" : "Apply on Official Portal"}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}