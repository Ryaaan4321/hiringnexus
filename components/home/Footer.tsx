"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="w-full bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs sm:text-sm"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
          {/* Brand and Short Statement */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1"
              aria-label="HiringNexus home"
            >
              <span
                aria-hidden="true"
                className="w-6 h-6 rounded bg-neutral-100 flex items-center justify-center text-neutral-950 font-mono text-xs font-semibold"
              >
                HX
              </span>
              <span className="font-sans text-base font-semibold tracking-tight text-white">
                HiringNexus
              </span>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              A human-centered engineering talent platform evaluating candidates through verified GitHub telemetry, systems architecture, and compensation transparency.
            </p>

            {/* Live operational status pill */}
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEMS OPERATIONAL · ALL SERVICES HEALTHY</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* For Candidates */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-200 font-semibold">
                [ Talent ]
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/user/dashboard" className="hover:text-white transition-colors">
                    Explore Open Roles
                  </Link>
                </li>
                <li>
                  <Link href="/user/signup" className="hover:text-white transition-colors">
                    Create Verified Profile
                  </Link>
                </li>
                <li>
                  <Link href="/user/login" className="hover:text-white transition-colors">
                    Candidate Sign In
                  </Link>
                </li>
                <li>
                  <Link href="#preview" className="hover:text-white transition-colors">
                    Compensation Index
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-200 font-semibold">
                [ Employers ]
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/auth/admin/signin" className="hover:text-white transition-colors">
                    Employer Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/admin/signup" className="hover:text-white transition-colors">
                    Create Recruiter Account
                  </Link>
                </li>
                <li>
                  <Link href="#pillars" className="hover:text-white transition-colors">
                    Telemetry Verification
                  </Link>
                </li>
                <li>
                  <Link href="/admin/createjob" className="hover:text-white transition-colors">
                    Direct Job Dispatch
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-200 font-semibold">
                [ Platform ]
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#preview" className="hover:text-white transition-colors">
                    Product Architecture
                  </Link>
                </li>
                <li>
                  <Link href="#pillars" className="hover:text-white transition-colors">
                    Proof Methodology
                  </Link>
                </li>
                <li>
                  <Link href="#proof" className="hover:text-white transition-colors">
                    Hiring Telemetry
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/Ryaaan4321/hiringnexus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub Open Source
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-200 font-semibold">
                [ Legal ]
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-white transition-colors">
                    Security & Trust
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:text-white transition-colors">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {currentYear} HiringNexus Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-300 transition-colors">Encrypted Zero-Knowledge Keys</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors">Non-Algorithmic Matching</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
