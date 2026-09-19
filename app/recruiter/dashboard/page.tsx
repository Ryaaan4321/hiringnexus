"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  Plus,
  ArrowUpRight,
  LogOut,
  Building2,
  ExternalLink,
  Code2,
  Search,
  Filter,
  ShieldCheck,
} from "lucide-react";
import { api, ApiError } from "@/lib/api";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: "Active" | "Draft" | "Review";
  applicantsCount: number;
  postedDate: string;
}

interface CandidatePreview {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  githubUser: string;
  topRepo: string;
  status: "Under Review" | "Interview Scheduled" | "Code Verified";
  appliedDate: string;
}

export default function RecruiterDashboardPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"roles" | "candidates">("roles");
  const [searchTerm, setSearchTerm] = useState("");

  const dummyJobs: JobOpening[] = [
    {
      id: "job-1",
      title: "Senior Distributed Systems Engineer",
      department: "Core Infrastructure",
      location: "San Francisco, CA / Remote",
      type: "Full-Time",
      salary: "$180,000 - $220,000",
      status: "Active",
      applicantsCount: 18,
      postedDate: "2 days ago",
    },
    {
      id: "job-2",
      title: "Full Stack Engineer (Next.js & TypeScript)",
      department: "Product Engineering",
      location: "Remote (US/EU)",
      type: "Full-Time",
      salary: "$140,000 - $175,000",
      status: "Active",
      applicantsCount: 34,
      postedDate: "5 days ago",
    },
    {
      id: "job-3",
      title: "Founding ML Systems Architect",
      department: "AI Research",
      location: "New York, NY",
      type: "Full-Time",
      salary: "$210,000 - $260,000",
      status: "Review",
      applicantsCount: 9,
      postedDate: "1 week ago",
    },
  ];

  const dummyCandidates: CandidatePreview[] = [
    {
      id: "cand-1",
      name: "Alex Rivera",
      role: "Distributed Systems Specialist",
      matchScore: 96,
      githubUser: "arivera-dev",
      topRepo: "raft-consensus-rs",
      status: "Code Verified",
      appliedDate: "3 hours ago",
    },
    {
      id: "cand-2",
      name: "Sophia Zhang",
      role: "Full Stack Engineer",
      matchScore: 92,
      githubUser: "sophiaz",
      topRepo: "vector-db-indexer",
      status: "Interview Scheduled",
      appliedDate: "Yesterday",
    },
    {
      id: "cand-3",
      name: "Marcus Vance",
      role: "Backend Infrastructure",
      matchScore: 88,
      githubUser: "mvance99",
      topRepo: "high-throughput-kafka-proxy",
      status: "Under Review",
      appliedDate: "2 days ago",
    },
  ];

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await api.auth.logout();
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#0a0e19] selection:bg-[#e1e1e1]">
      <header className="sticky top-0 z-40 w-full border-b border-[#e1e1e1] bg-[#f9f9f9]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:scale-105">
                <path d="M4 4L11 12L4 20H8L15 12L8 4H4Z" fill="#0a0e19" />
                <path d="M12 4L19 12L12 20H16L23 12L16 4H12Z" fill="#0a0e19" opacity="0.35" />
              </svg>
              <span className="font-serif text-lg tracking-tight font-medium">HiringNexus</span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#cecece] bg-white text-xs font-mono text-[#636363]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Recruiter / HR Workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/createjob"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0a0e19] px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Role</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#cecece] bg-white px-3 py-1.5 text-xs font-medium text-[#636363] transition-colors hover:border-[#0a0e19] hover:text-[#0a0e19]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e1e1e1] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Employer Terminal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
              Engineering Talent Pipeline
            </h1>
            <p className="mt-1 text-sm text-[#636363]">
              Review candidates evaluated with real GitHub telemetry and verified system benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#636363] bg-white border border-[#e1e1e1] px-3 py-1.5 rounded-md">
              Current Session: <strong className="text-[#0a0e19]">HR / Talent Lead</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-sm transition-all hover:border-[#cecece]">
            <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
              <span>Active Job Listings</span>
              <Briefcase className="w-4 h-4 text-[#0a0e19]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">3</span>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+1 this week</span>
            </div>
            <p className="mt-2 text-xs text-[#636363]">Live roles attracting candidates</p>
          </div>

          <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-sm transition-all hover:border-[#cecece]">
            <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
              <span>Total Applications</span>
              <Users className="w-4 h-4 text-[#0a0e19]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">61</span>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">24 pending review</span>
            </div>
            <p className="mt-2 text-xs text-[#636363]">Direct GitHub verified submissions</p>
          </div>

          <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-sm transition-all hover:border-[#cecece]">
            <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
              <span>Code Telemetry Pass Rate</span>
              <CheckCircle2 className="w-4 h-4 text-[#0a0e19]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">78.4%</span>
              <span className="text-xs font-mono text-[#636363]">vs 12% standard ATS</span>
            </div>
            <p className="mt-2 text-xs text-[#636363]">Pre-vetted benchmark qualification</p>
          </div>

          <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-sm transition-all hover:border-[#cecece]">
            <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
              <span>Interview Velocity</span>
              <TrendingUp className="w-4 h-4 text-[#0a0e19]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-medium text-[#0a0e19]">4.2 days</span>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">-40% time to offer</span>
            </div>
            <p className="mt-2 text-xs text-[#636363]">Average days from match to technical round</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex rounded-lg border border-[#e1e1e1] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("roles")}
              className={`px-4 py-1.5 text-xs font-mono transition-all rounded-md ${activeTab === "roles"
                ? "bg-[#0a0e19] text-white shadow-sm"
                : "text-[#636363] hover:text-[#0a0e19]"
                }`}
            >
              [ Managed Roles (3) ]
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("candidates")}
              className={`px-4 py-1.5 text-xs font-mono transition-all rounded-md ${activeTab === "candidates"
                ? "bg-[#0a0e19] text-white shadow-sm"
                : "text-[#636363] hover:text-[#0a0e19]"
                }`}
            >
              [ Vetted Candidates (3) ]
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#636363]" />
            <input
              type="text"
              placeholder="Filter by title, skill, or repo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-[#e1e1e1] bg-white pl-9 pr-3 py-1.5 text-xs text-[#0a0e19] placeholder-[#a0a0a0] focus:border-[#0a0e19] focus:outline-none"
            />
          </div>
        </div>

        {activeTab === "roles" && (
          <div className="rounded-xl border border-[#e1e1e1] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[#e1e1e1] px-5 py-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#0a0e19] font-serif">Active Role Listings</h3>
              <span className="text-xs font-mono text-[#636363]">Updated live from hiring database</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e1e1e1] bg-[#fafafa] font-mono text-[#636363]">
                    <th className="px-5 py-3 font-normal">ROLE TITLE</th>
                    <th className="px-5 py-3 font-normal">DEPARTMENT</th>
                    <th className="px-5 py-3 font-normal">LOCATION & TYPE</th>
                    <th className="px-5 py-3 font-normal">COMPENSATION</th>
                    <th className="px-5 py-3 font-normal">APPLICANTS</th>
                    <th className="px-5 py-3 font-normal">STATUS</th>
                    <th className="px-5 py-3 font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1e1e1]">
                  {dummyJobs
                    .filter((job) =>
                      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      job.department.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((job) => (
                      <tr key={job.id} className="hover:bg-[#fcfcfc] transition-colors">
                        <td className="px-5 py-4 font-medium text-[#0a0e19]">
                          <div className="flex items-center gap-2">
                            <span>{job.title}</span>
                            <span className="text-[10px] font-mono text-[#a0a0a0]">{job.postedDate}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[#636363]">{job.department}</td>
                        <td className="px-5 py-4 text-[#636363]">{job.location}</td>
                        <td className="px-5 py-4 font-mono text-[#0a0e19]">{job.salary}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 font-mono text-[#0a0e19] font-medium">
                            <Users className="w-3 h-3 text-[#636363]" />
                            {job.applicantsCount}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono ${
                              job.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/admin/jobs`}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#0a0e19] hover:underline"
                          >
                            <span>Manage</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "candidates" && (
          <div className="rounded-xl border border-[#e1e1e1] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[#e1e1e1] px-5 py-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#0a0e19] font-serif">Verified Candidate Stream</h3>
              <span className="text-xs font-mono text-[#636363]">Sorted by telemetry match index</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#e1e1e1] bg-[#fafafa] font-mono text-[#636363]">
                    <th className="px-5 py-3 font-normal">CANDIDATE</th>
                    <th className="px-5 py-3 font-normal">SPECIALIZATION</th>
                    <th className="px-5 py-3 font-normal">TELEMETRY MATCH</th>
                    <th className="px-5 py-3 font-normal">GITHUB PROOF</th>
                    <th className="px-5 py-3 font-normal">STAGE</th>
                    <th className="px-5 py-3 font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1e1e1]">
                  {dummyCandidates
                    .filter((cand) =>
                      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      cand.role.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((cand) => (
                      <tr key={cand.id} className="hover:bg-[#fcfcfc] transition-colors">
                        <td className="px-5 py-4 font-medium text-[#0a0e19]">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#0a0e19] text-white flex items-center justify-center text-[10px] font-mono">
                              {cand.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <div>{cand.name}</div>
                              <div className="text-[10px] font-mono text-[#a0a0a0]">Applied {cand.appliedDate}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[#636363]">{cand.role}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" />
                            {cand.matchScore}% Verified Match
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#0a0e19]">
                            <Code2 className="w-3 h-3 text-[#636363]" />
                            <span>@{cand.githubUser}</span>
                            <span className="text-[#a0a0a0]">/</span>
                            <span className="text-[#636363] underline">{cand.topRepo}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#f0f0f0] text-[#0a0e19] border border-[#cecece]">
                            {cand.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => alert(`Unlocking full code telemetry for ${cand.name}`)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#0a0e19] hover:underline"
                          >
                            <span>Inspect Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
