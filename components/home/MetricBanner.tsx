"use client";

import React from "react";

export function MetricBanner() {
  const metrics = [
    {
      value: "94%",
      label: "Interview-to-Offer Rate",
      detail: "Verified code craft bypasses subjective initial resume screens.",
    },
    {
      value: "48h",
      label: "Median Response Time",
      detail: "Direct connection to engineering hiring managers.",
    },
    {
      value: "₹0",
      label: "Zero Candidate Fees",
      detail: "We never charge developers for verification or placement.",
    },
    {
      value: "100%",
      label: "Salary Transparency",
      detail: "Every listed role requires verified, non-negotiable LPA ranges.",
    },
  ];

  return (
    <section
      id="proof"
      aria-label="Platform performance metrics"
      className="py-16 sm:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            [ 003 Telemetric Outcomes ]
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Proof over posturing. Numbers from production.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl sm:text-5xl font-semibold font-sans tracking-tight text-neutral-950 dark:text-white">
                  {m.value}
                </span>
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-2 font-mono">
                  {m.label}
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
