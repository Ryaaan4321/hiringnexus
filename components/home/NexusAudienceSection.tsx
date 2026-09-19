"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ContinuousCaptureSVG,
  SharedLearningSVG,
  CompanyBrainSVG,
  MultiplayerAISVG,
  StudentProofFlowSVG,
} from "@/components/nexus/NexusSVGAnimations";

interface NexusAudienceSectionProps {
  onOpenWaitlist: () => void;
}

export function NexusAudienceSection({ onOpenWaitlist }: NexusAudienceSectionProps) {
  const [activeAudience, setActiveAudience] = useState<"candidate" | "recruiter">("candidate");

  return (
    <div id="platform" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 space-y-6">
          <div className="flex items-center justify-center px-2">
            <div className="inline-flex max-w-full p-1 sm:p-1.5 rounded-xl border border-[#e1e1e1] bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setActiveAudience("candidate")}
                className={`px-2.5 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                  activeAudience === "candidate"
                    ? "bg-[#0a0e19] text-white shadow-xs"
                    : "text-[#636363] hover:text-[#0a0e19]"
                }`}
              >
                For Students & Builders
              </button>
              <button
                type="button"
                onClick={() => setActiveAudience("recruiter")}
                className={`px-2.5 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                  activeAudience === "recruiter"
                    ? "bg-[#0a0e19] text-white shadow-xs"
                    : "text-[#636363] hover:text-[#0a0e19]"
                }`}
              >
                For Engineering Teams
              </button>
            </div>
          </div>

          {activeAudience === "candidate" ? (
            <div className="space-y-6">
              <div className="home-card overflow-hidden rounded-[20px] p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbefdb] text-[#1e3c2c] text-xs font-mono border border-[#b8dfb8]">
                      <span>Direct Fast-Track Pipeline</span>
                    </div>
                    <h2 className="home-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#0a0e19] tracking-tight">
                      Your code is your credentials.
                      <br />
                      Not college pedigree, not buzzword resumes.
                    </h2>
                    <p className="text-sm md:text-base text-[#636363] leading-relaxed">
                      Built a distributed key-value store? Optimized SQL query execution plans? Shipped a WebGL shader engine? On HiringNexus, you don't need a corporate referral or an Ivy League degree. Engineering leaders evaluate your real GitHub commits, PR reviews, and test coverage directly.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#cecece] bg-[#fcfcfc] text-[#636363]">
                        Zero Pedigree Bias
                      </span>
                      <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#cecece] bg-[#fcfcfc] text-[#636363]">
                        Direct Line to Founders
                      </span>
                      <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#cecece] bg-[#fcfcfc] text-[#636363]">
                        Guaranteed 48h Response
                      </span>
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/signup"
                        className="home-arrow-link inline-flex items-center gap-1 text-sm font-medium"
                      >
                        <span>Claim your verified developer coordinates</span>
                        <span className="home-arrow">→</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex items-center justify-center p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc]">
                    <StudentProofFlowSVG />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="home-card rounded-2xl p-6 border border-[#e1e1e1] bg-white space-y-4 hover:border-[#0a0e19] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#0a0e19] text-white flex items-center justify-center font-serif text-lg">
                      A
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] border border-[#b8dfb8]">
                      Top 2% Concurrency
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#0a0e19]">Aarav Patel</h4>
                    <span className="text-xs font-mono text-[#818181]">CS Sophomore · Delhi Tech University</span>
                  </div>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Built high-performance async WebRTC proxy in Rust achieving 140k req/s. Zero corporate resume history.
                  </p>
                  <div className="pt-3 border-t border-[#e1e1e1] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#397554] font-semibold">₹28 LPA Offer</span>
                    <span className="text-[#818181]">Hired in 5 days</span>
                  </div>
                </div>

                <div className="home-card rounded-2xl p-6 border border-[#e1e1e1] bg-white space-y-4 hover:border-[#0a0e19] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#397554] text-white flex items-center justify-center font-serif text-lg">
                      M
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] border border-[#b8dfb8]">
                      99.4th Percentile
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#0a0e19]">Maya Lin</h4>
                    <span className="text-xs font-mono text-[#818181]">Self-Taught Systems Developer</span>
                  </div>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Architected distributed Raft consensus engine in Go with 54 merged open-source PRs. Direct connection to VP of Eng.
                  </p>
                  <div className="pt-3 border-t border-[#e1e1e1] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#397554] font-semibold">Series A Hire</span>
                    <span className="text-[#818181]">Zero ATS filters</span>
                  </div>
                </div>

                <div className="home-card rounded-2xl p-6 border border-[#e1e1e1] bg-white space-y-4 hover:border-[#0a0e19] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#1a2030] text-white flex items-center justify-center font-serif text-lg">
                      D
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] border border-[#b8dfb8]">
                      Senior Architecture Score
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#0a0e19]">Devon Brooks</h4>
                    <span className="text-xs font-mono text-[#818181]">Final Year Undergraduate</span>
                  </div>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Core contributor to React/WebGL graphics tooling with clean test coverage. Hired directly without algorithmic puzzle hazing.
                  </p>
                  <div className="pt-3 border-t border-[#e1e1e1] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#397554] font-semibold">₹32 LPA Offer</span>
                    <span className="text-[#818181]">Fast-tracked to final</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="home-card rounded-xl p-5 border border-[#e1e1e1] bg-white space-y-2">
                  <span className="font-mono text-xs text-[#818181] uppercase tracking-wider block">01 / Freedom</span>
                  <h4 className="font-semibold text-sm text-[#0a0e19]">Skip the ATS Black Hole</h4>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Never send your resume into an automated HR screening tool again. Engineering leaders evaluate code diffs directly.
                  </p>
                </div>

                <div className="home-card rounded-xl p-5 border border-[#e1e1e1] bg-white space-y-2">
                  <span className="font-mono text-xs text-[#818181] uppercase tracking-wider block">02 / Respect</span>
                  <h4 className="font-semibold text-sm text-[#0a0e19]">Direct Technical Access</h4>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Talk system design, concurrency, and architecture with CTOs and Staff Engineers who actually read your commits.
                  </p>
                </div>

                <div className="home-card rounded-xl p-5 border border-[#e1e1e1] bg-white space-y-2">
                  <span className="font-mono text-xs text-[#818181] uppercase tracking-wider block">03 / Fairness</span>
                  <h4 className="font-semibold text-sm text-[#0a0e19]">Transparent LPA Parameters</h4>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Every position displays verified compensation ranges upfront. No guessing games or lowball surprises.
                  </p>
                </div>

                <div className="home-card rounded-xl p-5 border border-[#e1e1e1] bg-white space-y-2">
                  <span className="font-mono text-xs text-[#818181] uppercase tracking-wider block">04 / Merit</span>
                  <h4 className="font-semibold text-sm text-[#0a0e19]">Open Source Recognition</h4>
                  <p className="text-xs text-[#636363] leading-relaxed">
                    Your GitHub volunteer contributions and side projects count as high-signal engineering proof.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="home-card overflow-hidden rounded-[20px]">
              <div className="px-6 pt-8 md:px-10 md:pt-12">
                <h2 className="text-xl leading-[1.1] tracking-[-0.02em] md:text-[1.9375rem]">
                  <span className="text-[#0a0e19]">
                    Everything an engineer builds, in one place hiring teams can verify.
                  </span>
                  <br />
                  <span className="text-[#818181]">
                    Collected from actual code telemetry, synthesized objectively, and free of
                    recruiter noise.
                  </span>
                </h2>
              </div>

              <div className="mt-8 grid border-t-[0.5px] border-[#e1e1e1] md:mt-10 md:grid-cols-2">
                <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[#e1e1e1] border-b-[0.5px] border-b-[#e1e1e1]">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">
                      Continuous telemetry
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                      Developer commits, merged GitHub PRs, system design repos, and review
                      comments. There&apos;s no manual test to take. Telemetry runs continuously,
                      and all of it is synthesized into one store that holds the full engineering
                      picture.
                    </p>
                    <Link
                      href="/user/dashboard"
                      className="home-arrow-link mt-5 cursor-pointer"
                    >
                      Explore telemetry signals <span className="home-arrow">→</span>
                    </Link>
                  </div>
                  <ContinuousCaptureSVG />
                </div>

                <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 border-b-[0.5px] border-b-[#e1e1e1]">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">
                      Shared benchmark layer
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                      Compare candidate problem solving against real-world engineering benchmarks.
                      Seniority and architecture capabilities are demonstrated by shipped code,
                      not recruiter guesswork. Teams hire faster and on verifiable signal.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenWaitlist}
                      className="home-arrow-link mt-5 cursor-pointer"
                    >
                      Automated artifact indexing <span className="home-arrow">→</span>
                    </button>
                  </div>
                  <SharedLearningSVG />
                </div>

                <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[#e1e1e1] border-b-[0.5px] border-b-[#e1e1e1] md:border-b-0">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">
                      Engineering candidate brain
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                      Query the talent pool naturally: &quot;Find backend engineers who scaled
                      Kafka consumers&quot; or &quot;Who designed multi-region Postgres
                      setups?&quot;. Clones of candidate code reviews answer with the exact PRs
                      and diffs.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenWaitlist}
                      className="home-arrow-link mt-5 cursor-pointer"
                    >
                      Natural language talent search <span className="home-arrow">→</span>
                    </button>
                  </div>
                  <CompanyBrainSVG />
                </div>

                <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-b-0">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">
                      Multiplayer evaluation
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                      Engineering managers, founders, and team leads collaborate directly over
                      shared artifacts. Leave inline notes on candidate diffs and fast-track
                      interviews with zero agency overhead.
                    </p>
                    <Link
                      href="/user/dashboard"
                      className="home-arrow-link mt-5 cursor-pointer"
                    >
                      Direct team collaboration <span className="home-arrow">→</span>
                    </Link>
                  </div>
                  <MultiplayerAISVG />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
