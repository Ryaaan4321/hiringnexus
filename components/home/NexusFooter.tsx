"use client";

import React from "react";
import Link from "next/link";

export function NexusFooter() {
  return (
    <footer className="pb-6">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="rounded-xl bg-white p-5 shadow-[0_0_7.5rem_rgba(0,0,0,0.07)] md:p-6 border border-[#e1e1e1]">
          <div className="grid items-end gap-y-10 lg:[grid-template-columns:repeat(20,minmax(0,1fr))]">
            <div className="self-start lg:col-span-8">
              <Link href="/" className="flex items-center gap-2.5" aria-label="HiringNexus home">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z" fill="#0a0e19" opacity="0.9" />
                  <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill="#0a0e19" />
                </svg>
                <span className="font-semibold text-xl tracking-tight text-[#0a0e19]">
                  HiringNexus
                </span>
              </Link>
            </div>
            <div className="lg:col-span-12">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:gap-x-8">
                <div>
                  <h3 className="mb-3 text-xs opacity-60 uppercase tracking-wider text-[#0a0e19]">
                    Platform
                  </h3>
                  <ul className="space-y-2 text-xs xl:text-base text-[#636363]">
                    <li>
                      <a href="#platform" className="home-footer-link hover:text-[#0a0e19]">
                        Platform
                      </a>
                    </li>
                    <li>
                      <a href="#how" className="home-footer-link hover:text-[#0a0e19]">
                        How it works
                      </a>
                    </li>
                    <li>
                      <a href="#signals" className="home-footer-link hover:text-[#0a0e19]">
                        Why HiringNexus
                      </a>
                    </li>
                    <li>
                      <a href="#security" className="home-footer-link hover:text-[#0a0e19]">
                        Security
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xs opacity-60 uppercase tracking-wider text-[#0a0e19]">
                    Resources
                  </h3>
                  <ul className="space-y-2 text-xs xl:text-base text-[#636363]">
                    <li>
                      <Link href="/user" className="home-footer-link hover:text-[#0a0e19]">
                        Candidate Directory
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                        Telemetry Standards
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xs opacity-60 uppercase tracking-wider text-[#0a0e19]">
                    Legal
                  </h3>
                  <ul className="space-y-2 text-xs xl:text-base text-[#636363]">
                    <li>
                      <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#f2f2f2] pt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-70 text-[#636363]">
              <span>© 2026 HiringNexus Inc.</span>
            </div>
            <div className="flex items-center gap-3 text-[#0a0e19]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="opacity-60 transition-opacity hover:opacity-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
