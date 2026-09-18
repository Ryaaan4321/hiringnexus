"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlenParticleGlobe } from "@/components/glen/GlenParticleGlobe";
import {
  ContinuousCaptureSVG,
  SharedLearningSVG,
  CompanyBrainSVG,
  MultiplayerAISVG,
  HowToUseRadialSVG,
} from "@/components/glen/GlenSVGAnimations";
import { GlenMarquee } from "@/components/glen/GlenMarquee";
import { GlenWhyAccordion } from "@/components/glen/GlenWhyAccordion";
import { GlenTestimonials } from "@/components/glen/GlenTestimonials";
import { GlenFAQ } from "@/components/glen/GlenFAQ";
import { GlenWaitlistModal } from "@/components/glen/GlenWaitlistModal";

export default function GlenPreviewPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="glen-wrapper min-h-dvh">
      {/* Google fonts & Glen-specific styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=Spline+Sans+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap");

        .glen-wrapper {
          --home-page: #f9f9f9;
          --home-white: #ffffff;
          --home-ink: #0a0e19;
          --home-ink-hover: #1a2030;
          --home-grey-400: #f2f2f2;
          --home-grey-450: #ececec;
          --home-grey-500: #e1e1e1;
          --home-grey-600: #cecece;
          --home-grey-700: #818181;
          --home-grey-800: #636363;
          --home-grey-900: #1f1f1f;
          --home-moss: #1e3c2c;
          --home-moss-hover: #2a5038;
          --home-pistachio: #dbefdb;
          --home-link-green: #397554;
          --home-fern: #3e7f5c;
          --home-border: 0.5px solid var(--home-grey-500);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: var(--home-page) !important;
          color: var(--home-ink) !important;
          letter-spacing: -0.02em;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow-x: hidden;
        }

        .glen-wrapper ::selection {
          background: var(--home-pistachio);
          color: var(--home-moss);
        }

        .home-serif {
          font-family: "Newsreader", Georgia, serif !important;
          font-weight: 300;
          letter-spacing: -0.02em;
        }

        .home-mono {
          font-family: "Spline Sans Mono", ui-monospace, monospace;
        }

        .home-card {
          background: var(--home-white);
          border: var(--home-border);
        }

        .home-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.625rem;
          border-radius: 0.375rem;
          border: 1px solid transparent;
          font-size: 1rem;
          line-height: 1;
          letter-spacing: -0.019em;
          cursor: pointer;
          transition: background 0.3s, border 0.3s, color 0.3s, transform 0.1s;
        }

        @media (min-width: 768px) {
          .home-btn {
            padding: 0.4375rem 0.625rem;
            border-radius: 0.5rem;
          }
        }

        .home-btn:active {
          transform: scale(0.97);
        }

        .home-btn:focus-visible {
          outline: 2px solid var(--home-ink);
          outline-offset: 3px;
        }

        .home-btn-fill {
          background: var(--home-ink);
          border-color: var(--home-ink);
          color: #fff;
        }

        .home-btn-fill:hover {
          background: var(--home-ink-hover);
          border-color: var(--home-ink-hover);
        }

        .home-btn-outline {
          background: transparent;
          border-color: var(--home-ink);
          color: var(--home-ink);
        }

        .home-btn-outline:hover {
          background: var(--home-ink);
          color: #fff;
        }

        .home-btn-glass {
          background: linear-gradient(rgba(206, 206, 206, 0.3), rgba(206, 206, 206, 0.3)),
            rgba(255, 255, 255, 0.85);
          border-color: rgba(206, 206, 206, 0.22);
          color: var(--home-ink);
        }

        .home-btn-glass:hover {
          background: linear-gradient(rgba(206, 206, 206, 0.45), rgba(206, 206, 206, 0.45)),
            rgba(255, 255, 255, 0.85);
        }

        .home-btn-moss {
          background: var(--home-moss);
          border-color: var(--home-moss);
          color: #fff;
        }

        .home-btn-moss:hover {
          background: var(--home-moss-hover);
          border-color: var(--home-moss-hover);
        }

        .home-arrow-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--home-link-green);
          font-size: 1rem;
          line-height: 1.1;
        }

        .home-arrow-link .home-arrow {
          display: inline-block;
          transition: transform 0.2s ease-out;
        }

        .home-arrow-link:hover .home-arrow {
          transform: translateX(2px);
        }

        .home-nav-pill:has(a:hover, button:hover) > :not(:hover) {
          opacity: 0.4;
        }

        .home-nav-pill > * {
          transition: opacity 0.2s;
        }

        .home-footer-link {
          position: relative;
          display: inline-block;
        }

        .home-footer-link:before {
          content: "";
          position: absolute;
          inset: -0.2rem -0.4rem;
          border-radius: 0.375rem;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .home-footer-link:hover:before {
          opacity: 0.08;
        }

        .home-row-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s ease-out;
        }

        .home-template-row:hover .home-row-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .home-marquee {
          overflow: hidden;
          mask: linear-gradient(90deg, transparent, #000 12% 88%, transparent);
          -webkit-mask: linear-gradient(90deg, transparent, #000 12% 88%, transparent);
        }

        .home-marquee-track {
          display: flex;
          gap: 0.625rem;
          width: max-content;
          animation: home-marquee 48s linear infinite;
        }

        .home-marquee-reverse .home-marquee-track {
          animation-direction: reverse;
        }

        .home-marquee:hover .home-marquee-track {
          animation-play-state: paused;
        }

        @keyframes home-marquee {
          0% {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .home-flow-dash {
          stroke-dasharray: 3 5;
          animation: home-flow 1.4s linear infinite;
        }

        @keyframes home-flow {
          to {
            stroke-dashoffset: -8;
          }
        }

        .home-node {
          animation: home-node-fill 7.2s linear infinite;
        }

        @keyframes home-node-fill {
          0%,
          14% {
            fill: #dbefdb;
          }
          22%,
          to {
            fill: #ffffff;
          }
        }

        .home-detail {
          overflow: hidden;
          max-height: 0;
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            max-height 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .home-detail-open {
          max-height: 1400px;
        }

        .home-detail-inner {
          opacity: 0;
          transform: translateX(20px);
          padding-top: 12px;
          transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.1s,
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }

        .home-detail-open .home-detail-inner {
          opacity: 1;
          transform: translateX(0);
        }

        @media (min-width: 1200px) {
          .home-detail {
            max-height: none;
            width: 0;
          }
          .home-detail-open {
            max-height: none;
            width: min(392px, 38vw);
          }
          .home-detail-inner {
            width: min(392px, 38vw);
            height: 100%;
            padding-top: 0;
            padding-left: 12px;
          }
        }

        .home-globe-bleed {
          -webkit-mask-image: radial-gradient(ellipse 65% 50% at 50% 50%, #000 60%, transparent 100%);
          mask-image: radial-gradient(ellipse 65% 50% at 50% 50%, #000 60%, transparent 100%);
        }

        .home-logo-box {
          border: 0.5px solid #cecece;
          background: #ffffff;
        }

        .home-logo-box:hover {
          border-color: #0a0e19;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-flow-dash,
          .home-marquee-track,
          .home-node {
            animation: none !important;
          }
          .home-detail,
          .home-detail-inner {
            transition: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#f9f9f9]/80 transition-colors">
        <div className="mx-auto grid w-full max-w-[85rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 min-[1200px]:py-8">
          {/* Logo */}
          <div className="justify-self-start">
            <a href="#top" className="flex items-center" aria-label="Glen home">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z" fill="#0a0e19" opacity="0.9" />
                <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill="#0a0e19" />
              </svg>
            </a>
          </div>

          {/* Navigation pill */}
          <nav
            className="home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex"
            style={{
              background:
                "linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85)",
              border: "0.5px solid rgba(206,206,206,0.22)",
            }}
          >
            <a href="#product" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              Product
            </a>
            <a href="#why-glen" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              Why Glen
            </a>
            <a href="#how" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              How it works
            </a>
            <a href="#security" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              Security
            </a>
            <a href="#faq" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              FAQ
            </a>
          </nav>

          {/* Actions */}
          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <div className="hidden min-[1200px]:block">
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="home-btn home-btn-glass cursor-pointer whitespace-nowrap"
              >
                Get access
              </button>
            </div>
            <a
              href="https://app.tryglen.com"
              target="_blank"
              rel="noreferrer"
              className="home-btn home-btn-glass whitespace-nowrap text-[14px] md:text-[15px]"
            >
              Design Partner Sign In
            </a>
            <div className="min-[1200px]:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
                className="home-btn home-btn-glass"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2 4.5h12M2 8h12M2 11.5h12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="min-[1200px]:hidden px-5 py-4 bg-white/95 border-b border-[#e1e1e1] shadow-lg flex flex-col gap-3">
            <a href="#product" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              Product
            </a>
            <a href="#why-glen" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              Why Glen
            </a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              How it works
            </a>
            <a href="#security" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              Security
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setWaitlistOpen(true);
              }}
              className="home-btn home-btn-fill w-full mt-2"
            >
              Get access
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main id="top">
        {/* Hero Section */}
        <section className="pt-8 md:pt-[3.69rem]">
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
            <h1 className="home-serif text-center text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] text-[#0a0e19]">
              Agents that get smarter
              <br className="hidden sm:block" /> as your company works.
            </h1>
            <p className="mx-auto mt-5 max-w-[44rem] text-center text-lg text-[#636363]">
              Glen puts the right organizational context into every prompt, pulled from your agent
              sessions, Slack, GitHub, tickets, calls, and docs. Agents work better, faster, and on
              fewer tokens, and the whole company becomes queryable.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="home-btn home-btn-fill cursor-pointer"
              >
                Get access
              </button>
              <a
                href="https://app.tryglen.com"
                target="_blank"
                rel="noreferrer"
                className="home-btn home-btn-outline"
              >
                Design Partner Sign In
              </a>
            </div>
          </div>
        </section>

        {/* 3D Particle Globe Animation */}
        <GlenParticleGlobe />

        {/* Social Proof / Logo Grid */}
        <section className="relative z-10 mx-auto w-full max-w-[85rem] px-5 pt-16 md:px-10 md:pt-[8.125rem]">
          <p className="mb-4 text-center text-[13px] md:mb-6 md:text-[17px] text-[#0a0e19]">
            Powering knowledge work at
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:grid-cols-6">
            {/* Zaplar */}
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wider text-xs md:text-sm text-[#0a0e19] uppercase">
                ZAPLAR
              </span>
            </figure>
            {/* Composio */}
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wide text-xs md:text-sm text-[#0a0e19]">
                composio
              </span>
            </figure>
            {/* Litmus */}
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-bold tracking-tight text-xs md:text-sm text-[#0a0e19]">
                litmus
              </span>
            </figure>
            {/* Corgi */}
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wide text-xs md:text-sm text-[#0a0e19]">
                corgi insurance
              </span>
            </figure>
            {/* Zima Labs */}
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-medium tracking-tight text-xs md:text-sm text-[#0a0e19]">
                Zima Labs
              </span>
            </figure>
            {/* Amorphic */}
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wider text-xs md:text-sm text-[#0a0e19] uppercase">
                AMORPHIC
              </span>
            </figure>
          </div>
        </section>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* Product Cards (2x2 Grid) */}
        <div id="product" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
              <div className="home-card overflow-hidden rounded-[20px]">
                <div className="px-6 pt-8 md:px-10 md:pt-12">
                  <h2 className="text-xl leading-[1.1] tracking-[-0.02em] md:text-[1.9375rem]">
                    <span className="text-[#0a0e19]">
                      Everything your company does, in one place your agents can use.
                    </span>
                    <br />
                    <span className="text-[#818181]">
                      Collected as the work happens, fed back where it matters, and yours to take
                      anywhere.
                    </span>
                  </h2>
                </div>

                <div className="mt-8 grid border-t-[0.5px] border-[#e1e1e1] md:mt-10 md:grid-cols-2">
                  {/* Card 1: Continuous capture */}
                  <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[#e1e1e1] border-b-[0.5px] border-b-[#e1e1e1]">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">
                        Continuous capture
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                        Agent sessions from Claude Code, Codex, and Cursor, plus Slack, GitHub,
                        tickets, calls, and docs. There&apos;s nothing to do by hand. Capture runs
                        on its own, and all of it is synthesized into one store that holds the full
                        picture.
                      </p>
                      <button
                        type="button"
                        onClick={() => setWaitlistOpen(true)}
                        className="home-arrow-link mt-5 cursor-pointer"
                      >
                        Every source, org-wide <span className="home-arrow">→</span>
                      </button>
                    </div>
                    <ContinuousCaptureSVG />
                  </div>

                  {/* Card 2: Shared learning layer */}
                  <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 border-b-[0.5px] border-b-[#e1e1e1]">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">
                        Shared learning layer
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                        As you work with your agents on coding and other knowledge work, Glen finds
                        the prior work that bears on the task and steers your model with it.
                        Equivalent work comes back significantly faster and on fewer tokens.
                      </p>
                      <button
                        type="button"
                        onClick={() => setWaitlistOpen(true)}
                        className="home-arrow-link mt-5 cursor-pointer"
                      >
                        Automatic context injection <span className="home-arrow">→</span>
                      </button>
                    </div>
                    <SharedLearningSVG />
                  </div>

                  {/* Card 3: Company brain */}
                  <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[#e1e1e1] border-b-[0.5px] border-b-[#e1e1e1] md:border-b-0">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">Company brain</h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                        Ask the company brain anything, from Slack, any MCP agent, or the web app.
                        For code, the PR reviewer and code search query clones of the agents that
                        made the change, so you get the why, not just the what.
                      </p>
                      <button
                        type="button"
                        onClick={() => setWaitlistOpen(true)}
                        className="home-arrow-link mt-5 cursor-pointer"
                      >
                        Slack, MCP, or the web app <span className="home-arrow">→</span>
                      </button>
                    </div>
                    <CompanyBrainSVG />
                  </div>

                  {/* Card 4: Multiplayer AI */}
                  <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-b-0">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium text-[#0a0e19]">Multiplayer AI</h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                        Skills distill from your team&apos;s work and surface automatically when
                        someone hits a task they cover, so nobody installs anything or goes looking
                        for what exists. Transcripts, live session takeovers, and shared artifacts
                        come with you no matter which harness or provider you use.
                      </p>
                      <button
                        type="button"
                        onClick={() => setWaitlistOpen(true)}
                        className="home-arrow-link mt-5 cursor-pointer"
                      >
                        Shared sessions, skills, and artifacts <span className="home-arrow">→</span>
                      </button>
                    </div>
                    <MultiplayerAISVG />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Marquee Prompts */}
        <GlenMarquee />

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* How to use Glen */}
        <div id="how" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
              <h2 className="mb-8 text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:mb-10 md:text-[2.5rem] md:leading-[0.98]">
                <span className="text-[#0a0e19]">How to use Glen.</span>
                <br />
                <span className="text-[#818181]">
                  Connect it once and it shows up everywhere your team already works.
                </span>
              </h2>

              <div className="flex flex-col gap-6 md:gap-8">
                <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
                  <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-none">
                    <div className="flex items-center justify-center overflow-hidden rounded-xl border-[0.5px] border-[#e1e1e1] bg-[#f2f2f2] p-6 md:aspect-[782/521]">
                      <HowToUseRadialSVG />
                    </div>
                  </div>

                  <div className="order-1 flex min-w-0 flex-col justify-center p-6 md:order-none md:p-10 lg:p-12">
                    <h3 className="max-w-[20ch] text-[1.375rem] leading-[1.1] md:text-[1.875rem] font-medium text-[#0a0e19]">
                      Set up in 5 minutes
                    </h3>
                    <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[#636363] md:text-base">
                      Add the Glen plugin to Claude Code, Codex, or Cursor. Any agent, including
                      ones you built yourself, reaches Glen through the MCP server or the command
                      line tool, and both give full access to everything Glen does. The web app, the
                      PR reviewer, and the Slack bot come with your account and need no setup. The
                      integrations sync once and only one person needs to set them up. Glen reads
                      public material only, such as public Slack channels and shared team
                      transcripts. You can have Glen up and running with full functionality in less
                      than 5 minutes, available to everyone.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>

        {/* Why Glen Interactive Section */}
        <GlenWhyAccordion />

        <div className="h-12 md:h-20" aria-hidden="true" />

        {/* Security Section */}
        <div id="security" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
              <div className="home-card rounded-xl px-6 py-10 md:px-16 md:py-14">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#397554] font-semibold">
                    Security
                  </p>
                  <h2 className="home-serif mt-4 text-[2rem] leading-[1.05] md:text-[3rem] text-[#0a0e19]">
                    You&apos;re in good hands.
                  </h2>
                  <p className="mt-4 max-w-[36rem] text-[15px] text-[#636363] md:text-base">
                    We&apos;ll gladly walk you through what we do to keep Glen secure and how the
                    architecture works, with our founder, personally.
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setWaitlistOpen(true)}
                      className="home-btn home-btn-moss cursor-pointer"
                    >
                      Get access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* Testimonials */}
        <GlenTestimonials />

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* FAQ */}
        <GlenFAQ onOpenWaitlist={() => setWaitlistOpen(true)} />

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* Final CTA */}
        <section className="pb-16 md:pb-32">
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
            <h2 className="text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:text-[2.5rem] md:leading-[0.98] text-[#0a0e19]">
              Welcome to the future of work.
            </h2>
            <p className="mt-4 text-[#636363]">
              Leave your work email and we&apos;ll set your team up, or sign in if you&apos;re
              already a design partner.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="home-btn home-btn-fill cursor-pointer"
              >
                Get access
              </button>
              <a
                href="https://app.tryglen.com"
                target="_blank"
                rel="noreferrer"
                className="home-btn home-btn-outline"
              >
                Design Partner Sign In
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pb-6">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="rounded-xl bg-white p-5 shadow-[0_0_7.5rem_rgba(0,0,0,0.07)] md:p-6 border border-[#e1e1e1]">
            <div className="grid items-end gap-y-10 lg:[grid-template-columns:repeat(20,minmax(0,1fr))]">
              {/* Logo */}
              <div className="self-start lg:col-span-8">
                <a href="#top" className="flex items-center gap-2.5" aria-label="Glen home">
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z" fill="#0a0e19" opacity="0.9" />
                    <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill="#0a0e19" />
                  </svg>
                </a>
              </div>

              {/* Navigation columns */}
              <div className="lg:col-span-12">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:gap-x-8">
                  <div>
                    <h3 className="mb-3 text-xs opacity-60 uppercase tracking-wider text-[#0a0e19]">
                      Product
                    </h3>
                    <ul className="space-y-2 text-xs xl:text-base text-[#636363]">
                      <li>
                        <a href="#product" className="home-footer-link hover:text-[#0a0e19]">
                          Product
                        </a>
                      </li>
                      <li>
                        <a href="#how" className="home-footer-link hover:text-[#0a0e19]">
                          How it works
                        </a>
                      </li>
                      <li>
                        <a href="#why-glen" className="home-footer-link hover:text-[#0a0e19]">
                          Why Glen
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
                        <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                          Blog
                        </a>
                      </li>
                      <li>
                        <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                          Vision
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
                          Privacy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                          Terms
                        </a>
                      </li>
                      <li>
                        <a href="#" className="home-footer-link hover:text-[#0a0e19]">
                          Sub-processors
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#f2f2f2] pt-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-70 text-[#636363]">
                <span>© 2026 Glen Labs Incorporated</span>
                {/* Backed by YC Pill */}
                <span className="inline-flex items-center gap-1.5 rounded bg-[#f2f2f2] px-2 py-1 text-[11px] font-medium text-[#0a0e19]">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-[#fb651e] font-bold text-white text-[10px]">
                    Y
                  </span>
                  Backed by Y Combinator
                </span>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3 text-[#0a0e19]">
                <a
                  href="https://www.linkedin.com/company/tryglen"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Glen on LinkedIn"
                  className="opacity-60 transition-opacity hover:opacity-100"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2.5" y="7" width="3.2" height="10.5" fill="currentColor" />
                    <circle cx="4.1" cy="3.9" r="1.8" fill="currentColor" />
                    <path
                      d="M8.2 7h3v1.5c.5-.9 1.6-1.7 3.2-1.7 2.4 0 3.6 1.5 3.6 4.3v6.4h-3.2v-5.9c0-1.4-.5-2.2-1.7-2.2-1.2 0-1.9.8-1.9 2.2v5.9H8.2V7z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://x.com/try_glen"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Glen on X"
                  className="opacity-60 transition-opacity hover:opacity-100"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M3 3h3.6l4 5.3L15.2 3H17l-5.5 6.4L17.5 17h-3.6l-4.3-5.7L4.7 17H3l5.7-6.7L3 3z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Waitlist Dialog Modal */}
      <GlenWaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
