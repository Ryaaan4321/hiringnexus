"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Platform announcement"
      className="w-full bg-neutral-900 text-neutral-200 text-[13px] font-mono h-10 flex items-center border-b border-neutral-800 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] w-full px-4 sm:px-6 flex items-center justify-between">
        {/* Decorative bracket ticker */}
        <div aria-hidden="true" className="hidden sm:flex items-center space-x-1 text-neutral-500 text-xs">
          <span className="text-neutral-400 font-semibold">[</span>
          <span>SYS</span>
          <span className="text-emerald-400 font-bold">•</span>
          <span>LIVE</span>
          <span className="text-neutral-400 font-semibold">]</span>
          <span className="text-neutral-700 mx-2">/</span>
          <span className="text-neutral-500">v2.4 telemetry stream</span>
        </div>

        {/* Central announcement */}
        <div className="flex items-center mx-auto sm:mx-0">
          <Link
            href="/user/dashboard"
            className="group flex items-center gap-2 hover:text-white transition-colors"
          >
            <span className="font-sans text-neutral-300 font-medium tracking-tight">
              Verified GitHub telemetry & direct engineering pipeline is now live
            </span>
            <span className="text-neutral-500 group-hover:text-neutral-300 transition-transform duration-150 group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5 inline" aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Status tag */}
        <div className="hidden md:flex items-center text-xs text-neutral-400">
          <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            [ 000 Latency: 18ms ]
          </span>
        </div>
      </div>
    </aside>
  );
}
