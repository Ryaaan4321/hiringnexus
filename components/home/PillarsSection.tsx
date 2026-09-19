"use client";

import React from "react";
import { GitPullRequest, Code2, Cpu, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";

export function PillarsSection() {
  const pillars = [
    {
      index: "001",
      tag: "Telemetric Ingestion",
      title: "Real engineering signals, captured from day one.",
      description:
        "Connect your GitHub in one click. HiringNexus analyzes repository commits, PR reviews, architectural patterns, and release cadences — translating raw work into a high-fidelity competency model.",
      features: [
        "Deep AST analysis across 14+ modern languages",
        "Verification of production pull requests & commit history",
        "Automatic extraction of open-source impact & dependencies",
      ],
      codeSnippet: `// telemetry-runtime.ts
const candidate = await NexusEngine.verify({
  githubUser: "dev_aryan",
  inspectDepth: "production_commits",
  weights: { systemsArchitecture: 0.45, codeCleanliness: 0.35 }
});
console.log(candidate.signalLevel);`,
    },
    {
      index: "002",
      tag: "Proof of Craft",
      title: "Say goodbye to 5-round LeetCode theater.",
      description:
        "Great engineers shouldn't have to invert binary trees on a whiteboard. We evaluate what actually matters: can you design clean distributed systems, write resilient APIs, and communicate trade-offs cleanly?",
      features: [
        "Repository-based architecture reviews",
        "Zero subjective screening or algorithmic puzzles",
        "Deterministic benchmark scores visible to employers",
      ],
      codeSnippet: `// evaluation-output.json
{
  "concurrencyHandling": "EXEMPLARY",
  "dataModeling": "POSTGRESQL_OPTIMIZED",
  "testCoverage": 98.4,
  "verifiedLPAExpectation": [24, 38]
}`,
    },
    {
      index: "003",
      tag: "Direct Settlement",
      title: "Direct lines to decision makers. Zero spam.",
      description:
        "Skip the black hole of ATS forms and 100-message LinkedIn InMail spam. Get matched directly with hiring VPs and engineering managers who have confirmed budget and transparent LPA salary ranges.",
      features: [
        "Upfront salary compensation published for every role",
        "Direct connection to hiring managers & CTOs",
        "Guaranteed response within 72 hours of application",
      ],
      codeSnippet: `// hiring-contract.ts
const connection = await DirectPipeline.dispatch({
  candidateId: "usr_904fa",
  targetCompany: "Zoca Infrastructure",
  confirmedBudgetLPA: "40-55 LPA",
  interviewWindow: "Next 48 Hours"
});`,
    },
  ];

  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="py-16 sm:py-24 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            [ 002 Architecture & Pillars ]
          </span>
          <h2
            id="pillars-heading"
            className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 max-w-2xl text-balance"
          >
            Engineered for high-performing software teams.
          </h2>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
          {pillars.map((pillar) => (
            <div
              key={pillar.index}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative"
            >
              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs text-neutral-500 flex items-center gap-2">
                  <span className="text-neutral-400 font-semibold">[</span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-bold">{pillar.index}</span>
                  <span className="text-neutral-500">{pillar.tag}</span>
                  <span className="text-neutral-400 font-semibold">]</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white text-balance">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                  {pillar.description}
                </p>

                <ul className="space-y-2.5 pt-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                  {pillar.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 mt-0.5 shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Link
                    href="/user/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:underline group"
                  >
                    <span>Inspect live methodology</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-200 shadow-sm overflow-hidden font-mono text-xs">
                  <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      nexus_runtime - verification_node
                    </span>
                    <span className="text-neutral-600">utf-8</span>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto leading-relaxed text-neutral-300">
                    <code>{pillar.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
