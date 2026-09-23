"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, Star, ShieldCheck, Briefcase, DollarSign, Terminal, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProductPreviewTabs() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "matrix" | "pipeline" | "compensation">("telemetry");

  const tabs = [
    { id: "telemetry", label: "01 GitHub Telemetry" },
    { id: "matrix", label: "02 Verified Stack" },
    { id: "pipeline", label: "03 Direct Pipeline" },
    { id: "compensation", label: "04 Transparent Pay" },
  ] as const;

  return (
    <section id="preview" className="py-16 sm:py-24 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              [ 001 System Preview ]
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              An engineering evaluation engine that inspects real code.
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
            Explore how HiringNexus turns repository metadata, code depth, and compensation parameters into actionable talent signals.
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md font-mono text-xs sm:text-[13px] tracking-tight whitespace-nowrap transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${activeTab === tab.id
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                }`}
            >
              [ {tab.label} ]
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
          <div className="h-10 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950 flex items-center justify-between text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="ml-2 text-neutral-700 dark:text-neutral-300 font-sans font-medium text-[13px]">
                {activeTab === "telemetry" && "telemetry-analyzer - dev_aryan_nexus"}
                {activeTab === "matrix" && "skill-verification - typescript-rust-distributed"}
                {activeTab === "pipeline" && "candidate-pipeline - live-interviews"}
                {activeTab === "compensation" && "lpa-index - market-transparency"}
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Verified Pipeline Active
            </span>
          </div>
          <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-center">
            {activeTab === "telemetry" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50/50 dark:bg-neutral-950/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-bold text-lg font-mono">
                      A
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-base">Aryan Sharma</h4>
                      <p className="font-mono text-xs text-neutral-500">@aryan_code · 48 repos</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    <div className="flex justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <span>Stargazers:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">1,420</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <span>Primary Lang:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">TypeScript / Go</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <span>Commit Frequency:</span>
                      <span className="font-semibold text-emerald-600">Top 4% Global</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900 hover:border-neutral-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        <span className="font-mono font-semibold text-sm text-neutral-900 dark:text-white">
                          hyper-queue / distributed-worker
                        </span>
                      </div>
                      <span className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                        Rust
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                      Low-latency distributed task queue with zero-copy deserialization and persistent log storage.
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs font-mono text-neutral-500">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 842</span>
                      <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> 74</span>
                      <span className="text-emerald-600 font-semibold">99.8% Test Coverage</span>
                    </div>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900 hover:border-neutral-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        <span className="font-mono font-semibold text-sm text-neutral-900 dark:text-white">
                          nexus-runtime / edge-cache
                        </span>
                      </div>
                      <span className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                        TypeScript
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                      High-throughput HTTP caching proxy leveraging Cloudflare Workers and LRU memory cache.
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs font-mono text-neutral-500">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 578</span>
                      <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> 31</span>
                      <span className="text-emerald-600 font-semibold">Automated CI/CD Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "matrix" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                    Automated Competency Mapping
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Rather than relying on bulleted buzzwords, our algorithms crawl AST tokens, PR discussions, and production commit diffs to index real architectural competence.
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: "Distributed Systems & Consensus", score: 96 },
                      { name: "Next.js App Router Architecture", score: 94 },
                      { name: "PostgreSQL & Query Optimization", score: 88 },
                      { name: "High-concurrency Event Queues", score: 91 },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span>{item.name}</span>
                          <span className="text-neutral-900 dark:text-white font-semibold">{item.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-600 mb-2 font-mono text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      Cryptographically Verified
                    </div>
                    <h5 className="font-semibold text-neutral-900 dark:text-white">Proof of Craft Certification</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                      Candidates hold verifiable identity keys connecting GitHub profiles, code contribution graphs, and previous engineering impact.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>STATUS: VALIDATED</span>
                    <span>KEY: 0x9f4a...c71b</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pipeline" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Live Candidate Ingestion Pipeline</h4>
                    <p className="text-xs text-neutral-500">Direct hiring manager dispatch without agency middle-men</p>
                  </div>
                  <Link href="/user" className="text-xs font-mono flex items-center gap-1 hover:underline">
                    View Live Pipeline <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { role: "Staff Systems Engineer", company: "Zoca Infrastructure", status: "Reviewing Code", salary: "45-60 LPA" },
                    { role: "Senior Frontend Architect", company: "Agnost Platform", status: "Interview Scheduled", salary: "35-48 LPA" },
                    { role: "Backend Performance Lead", company: "Codebuff Inc", status: "Direct Offer Sent", salary: "50-70 LPA" },
                  ].map((job) => (
                    <div key={job.role} className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900">
                      <span className="text-[11px] font-mono uppercase text-emerald-600 font-semibold">{job.status}</span>
                      <h5 className="font-medium text-neutral-900 dark:text-white mt-1">{job.role}</h5>
                      <p className="text-xs text-neutral-500 mt-0.5">{job.company}</p>
                      <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs font-mono">
                        <span className="text-neutral-500">Range:</span>
                        <span className="font-semibold text-neutral-900 dark:text-white">{job.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "compensation" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 bg-white dark:bg-neutral-900">
                  <span className="font-mono text-xs text-neutral-500">[ 0-2 Years Experience ]</span>
                  <div className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mt-2">12 - 24 LPA</div>
                  <p className="text-xs text-neutral-500 mt-2">Verified entry to junior systems engineers with proven personal projects.</p>
                </div>

                <div className="border border-neutral-900 dark:border-neutral-100 rounded-lg p-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-md">
                  <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">[ 3-5 Years Experience ]</span>
                  <div className="text-3xl font-semibold tracking-tight mt-2">25 - 50 LPA</div>
                  <p className="text-xs text-neutral-300 dark:text-neutral-700 mt-2">Mid-level to senior contributors with ownership over production services.</p>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 bg-white dark:bg-neutral-900">
                  <span className="font-mono text-xs text-neutral-500">[ 6+ Years / Staff ]</span>
                  <div className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mt-2">50 - 90+ LPA</div>
                  <p className="text-xs text-neutral-500 mt-2">Staff, principal, and systems architects steering distributed reliability.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
