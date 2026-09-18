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
import { GlenWaitlistModal } from "@/components/glen/GlenWaitlistModal";

const MARQUEE_ROW_1 = [
  "Find backend engineers who scaled systems to 100k req/sec",
  "Show PRs demonstrating clean concurrency primitives in Go",
  "Pull system design artifacts for distributed storage",
  "Review architectural trade-offs in this candidate's PR",
  "Find engineers with verified Postgres query optimization",
];

const MARQUEE_ROW_2 = [
  "Surface candidates with open-source contributions in Rust",
  "Compare this engineer's code style to our team guidelines",
  "Verify production incident debugging capabilities",
  "Show candidates who designed multi-tenant auth from scratch",
  "Find staff engineers with high review-to-merge ratios",
];

const MARQUEE_ROW_3 = [
  "Pull candidate PRs addressing memory leaks in Node.js",
  "Find frontend engineers with proven WebGL experience",
  "Review commit distribution for full-stack candidates",
  "Filter for engineers with zero AI-generated fluff in commits",
  "Fast-track candidates with senior benchmark clearance",
];

interface WhyItem {
  label: string;
  icon: React.ReactNode;
  detail: {
    title: string;
    body: string;
  };
}

const WHY_ITEMS: WhyItem[] = [
  {
    label: "The why behind the code",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3.5" width="16" height="13" rx="2" />
        <path d="m5.5 8 2.5 2-2.5 2M10.5 12.5h4" />
      </svg>
    ),
    detail: {
      title: "Inspect why any architecture decision was made",
      body: "Highlight any commit, PR diff, or architectural trade-off in a candidate's portfolio. HiringNexus synthesizes their real GitHub telemetry, review comments, and issue discussions so you understand their decision-making before the first call.",
    },
  },
  {
    label: "Faster, on fewer interview rounds",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13.5c4.5-2.5 6.5-6.5 6.5-11-4.5 0-8.5 2-11 6.5l4.5 4.5Z" />
        <path d="M5.5 9 3 10.5 5 12M11 14.5 9.5 17 8 15M13 7a1 1 0 1 0 0-.01" />
        <path d="M4.5 15.5c-.8.8-1.2 2.3-1.3 3.3 1-.1 2.5-.5 3.3-1.3" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Skip 4 rounds of leetcode trivia",
      body: "HiringNexus proves what candidates have already built and shipped. You write a targeted inquiry instead of putting engineers through abstract whiteboard puzzles, cutting hiring cycles from 5 weeks to 5 days.",
    },
  },
  {
    label: "One signal, not resume spam",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <ellipse cx="10" cy="4.5" rx="6.5" ry="2.5" />
        <path d="M3.5 4.5v11c0 1.38 2.9 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-11M3.5 10c0 1.38 2.9 2.5 6.5 2.5s6.5-1.12 6.5-2.5" />
      </svg>
    ),
    detail: {
      title: "Real engineering proof, zero recruiter fluff",
      body: "Traditional resumes are stuffed with buzzwords and agency exaggeration. The real measure of an engineer is spread across their pull requests, git commit histories, and peer reviews. HiringNexus brings it all into one verified signal.",
    },
  },
  {
    label: "Verified GitHub telemetry",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.5 17.5 6.5 10 10.5 2.5 6.5 10 2.5Z" />
        <path d="M2.5 10.5 10 14.5l7.5-4M2.5 14 10 18l7.5-4" />
      </svg>
    ),
    detail: {
      title: "Authentic commit forensics and contribution proof",
      body: "Our verification engine audits commit patterns, PR review depth, and genuine repository ownership. AI-generated commit spam and superficial forks are filtered out, surfacing authentic builders.",
    },
  },
  {
    label: "Anyone can evaluate like a Staff Engineer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4.5h14v9H8l-3.5 3v-3H3v-9Z" />
        <path d="M6.5 9h7" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Staff-level judgment applied across every evaluation",
      body: "Founders and non-technical hiring managers can inspect senior candidate capability with confidence. HiringNexus highlights architecture complexity, code maintainability, and test coverage metrics automatically.",
    },
  },
  {
    label: "A shared artifact library",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 2.5h7l3 3v12H5v-15Z" />
        <path d="M12 2.5v3h3M7.5 9.5h5M7.5 12.5h5" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Every candidate review and PR diff in one place",
      body: "Collaborate with your engineering team over candidate code artifacts. Leave timestamped inline notes, compare historical benchmarks, and hand off candidates cleanly across interviewers without losing context.",
    },
  },
  {
    label: "A permanent, auditable record",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.5 17 6.25v7.5L10 17.5 3 13.75v-7.5L10 2.5Z" />
        <path d="M3 6.25 10 10l7-3.75M10 10v7.5" />
      </svg>
    ),
    detail: {
      title: "Every hiring decision backed by verifiable proof",
      body: "Trace any hiring decision back to verified code artifacts: the exact PRs reviewed, benchmark percentiles, and technical competencies evaluated. Build an objective, bias-free engineering culture.",
    },
  },
  {
    label: "Direct engineering connections",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" />
        <ellipse cx="10" cy="10" rx="3.2" ry="7.5" />
        <path d="M2.5 10h15" />
      </svg>
    ),
    detail: {
      title: "Connect directly with engineering leaders",
      body: "No headhunters, no recruitment agency markups, and no cold InMail spam. Engineers showcase real proof, and hiring leaders initiate direct connections with full respect for time and craft.",
    },
  },
];

const FAQS = [
  {
    question: "What is HiringNexus, exactly?",
    answer:
      "HiringNexus is a verified technical talent platform that evaluates engineers by their real code artifacts—pull requests, GitHub telemetry, system design repos, and review comments—instead of keyword-stuffed resumes. We connect engineering leaders directly with developers based on verified proof of ability.",
  },
  {
    question: "How is this different from traditional tech recruiting agencies or LinkedIn?",
    answer:
      "Recruiters spam keyword matches and mark up salaries by 20-30%. LinkedIn is inundated with unverified claims. HiringNexus analyzes actual git history, code quality, PR collaboration, and benchmark performance so engineering managers can hire with direct technical conviction.",
  },
  {
    question: "What repositories does HiringNexus inspect?",
    answer:
      "HiringNexus reads public repositories, open-source contributions, and candidate-authorized GitHub activity. We never access private code without explicit OAuth authorization, and private sessions can be excluded entirely.",
  },
  {
    question: "How are engineering skills and benchmarks calculated?",
    answer:
      "Our telemetric engine evaluates code complexity, architecture depth, test coverage, PR review thoroughness, and release consistency against verified benchmarks derived from thousands of senior engineering projects.",
  },
  {
    question: "Can developers control what is displayed on their profile?",
    answer:
      "Yes. Candidates have full ownership of their profile and can choose which repositories, PR artifacts, and highlights are featured on their public evaluation page.",
  },
  {
    question: "How do hiring teams get started?",
    answer:
      "Click 'Get Access' or 'Sign In' to explore verified engineering talent immediately. You can search by architecture domain, inspect real code artifacts, and message candidates directly.",
  },
];

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whyIdx, setWhyIdx] = useState<number | null>(0);
  const [activeWhy, setActiveWhy] = useState(0);
  const [faqOpenStates, setFaqOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setFaqOpenStates((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const currentWhyDetail = WHY_ITEMS[activeWhy].detail;

  return (
    <div className="min-h-dvh bg-[#f9f9f9] text-[#0a0e19] selection:bg-[#dbefdb] selection:text-[#1e3c2c]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#f9f9f9]/85 border-b border-[#e1e1e1]/50 transition-colors">
        <div className="mx-auto grid w-full max-w-[85rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 min-[1200px]:py-6">
          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" className="flex items-center gap-2.5" aria-label="HiringNexus home">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z" fill="#0a0e19" opacity="0.9" />
                <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill="#0a0e19" />
              </svg>
              <span className="font-semibold text-lg tracking-tight text-[#0a0e19]">
                HiringNexus
              </span>
            </Link>
          </div>

          {/* Nav Pill */}
          <nav
            className="home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex"
            style={{
              background:
                "linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85)",
              border: "0.5px solid rgba(206,206,206,0.22)",
            }}
          >
            <a href="#platform" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              Platform
            </a>
            <a href="#signals" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
              Signals
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

          {/* Action CTAs */}
          <div className="col-start-3 flex items-center gap-2.5 justify-self-end">
            <button
              type="button"
              onClick={() => setWaitlistOpen(true)}
              className="hidden min-[1200px]:inline-flex home-btn home-btn-glass cursor-pointer whitespace-nowrap"
            >
              Get Access
            </button>
            <Link
              href="/auth/login"
              className="home-btn home-btn-glass whitespace-nowrap text-[14px] md:text-[15px]"
            >
              Sign In
            </Link>
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
            <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              Platform
            </a>
            <a href="#signals" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
              Signals
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
            <Link
              href="/user/dashboard"
              className="home-btn home-btn-fill w-full mt-2 text-center"
            >
              Explore Verified Talent
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="top">
        {/* Hero Section */}
        <section className="pt-10 md:pt-[3.75rem]">
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
            <h1 className="home-serif text-center text-[2.1rem] leading-[1.05] tracking-[-0.02em] md:text-[2.85rem] lg:text-[3.65rem] xl:text-[4.15rem] text-[#0a0e19]">
              Engineering talent evaluated by proof,
              <br className="hidden sm:block" /> not keyword fluff.
            </h1>
            <p className="mx-auto mt-5 max-w-[46rem] text-center text-lg text-[#636363]">
              HiringNexus synthesizes real developer artifacts into clear hiring signals—pulled from
              GitHub PRs, system design commits, telemetry, and verified code reviews. No recruiter
              noise, no keyword fluff.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/user/dashboard"
                className="home-btn home-btn-fill cursor-pointer"
              >
                Explore Verified Talent
              </Link>
              <Link href="/auth/login" className="home-btn home-btn-outline">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* 3D Particle Globe */}
        <GlenParticleGlobe />

        {/* Powering Engineering Teams */}
        <section className="relative z-10 mx-auto w-full max-w-[85rem] px-5 pt-16 md:px-10 md:pt-[8.125rem]">
          <p className="mb-4 text-center text-[13px] md:mb-6 md:text-[17px] text-[#0a0e19]">
            Powering technical hiring at
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:grid-cols-6">
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wider text-xs md:text-sm text-[#0a0e19] uppercase">
                STRIPE
              </span>
            </figure>
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wide text-xs md:text-sm text-[#0a0e19]">
                ▲ Vercel
              </span>
            </figure>
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-bold tracking-tight text-xs md:text-sm text-[#0a0e19]">
                supabase
              </span>
            </figure>
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wide text-xs md:text-sm text-[#0a0e19]">
                Linear
              </span>
            </figure>
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-medium tracking-tight text-xs md:text-sm text-[#0a0e19]">
                Resend
              </span>
            </figure>
            <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
              <span className="font-semibold tracking-wider text-xs md:text-sm text-[#0a0e19] uppercase">
                MODAL
              </span>
            </figure>
          </div>
        </section>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* Product Cards (2x2 Grid) */}
        <div id="platform" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
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
                  {/* Card 1: Continuous telemetry */}
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

                  {/* Card 2: Shared benchmark layer */}
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
                        onClick={() => setWaitlistOpen(true)}
                        className="home-arrow-link mt-5 cursor-pointer"
                      >
                        Automated artifact indexing <span className="home-arrow">→</span>
                      </button>
                    </div>
                    <SharedLearningSVG />
                  </div>

                  {/* Card 3: Engineering candidate brain */}
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
                        onClick={() => setWaitlistOpen(true)}
                        className="home-arrow-link mt-5 cursor-pointer"
                      >
                        Natural language talent search <span className="home-arrow">→</span>
                      </button>
                    </div>
                    <CompanyBrainSVG />
                  </div>

                  {/* Card 4: Multiplayer evaluation */}
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
            </div>
          </section>
        </div>

        {/* Marquee Prompts */}
        <section className="pt-16 md:pt-32">
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
            <p className="text-center text-[13px] text-[#818181] md:text-sm">
              Signals that HiringNexus unlocks for engineering teams
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            {/* Row 1 */}
            <div className="home-marquee">
              <div className="home-marquee-track">
                {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((prompt, idx) => (
                  <span
                    key={idx}
                    className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
                  >
                    “{prompt}”
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2 - Reverse */}
            <div className="home-marquee home-marquee-reverse">
              <div className="home-marquee-track">
                {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((prompt, idx) => (
                  <span
                    key={idx}
                    className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
                  >
                    “{prompt}”
                  </span>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div className="home-marquee">
              <div className="home-marquee-track">
                {[...MARQUEE_ROW_3, ...MARQUEE_ROW_3].map((prompt, idx) => (
                  <span
                    key={idx}
                    className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
                  >
                    “{prompt}”
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* How to use */}
        <div id="how" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
              <h2 className="mb-8 text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:mb-10 md:text-[2.5rem] md:leading-[0.98]">
                <span className="text-[#0a0e19]">How to use HiringNexus.</span>
                <br />
                <span className="text-[#818181]">
                  Connect once and evaluate proof directly across your entire engineering team.
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
                      Connect your GitHub organization or claim your developer profile with one
                      click. HiringNexus indexes public repos, verified contributions, and
                      peer-reviewed artifacts. Available immediately to your entire hiring team
                      without complex integrations or months of configuration.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>

        {/* Why HiringNexus Interactive Section */}
        <div id="signals" className="mt-28 scroll-mt-24 md:mt-44">
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
            <div className="relative flex overflow-hidden rounded-[24px] md:min-h-[760px]">
              {/* Dark ambient background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 18% 22%, #2c4636 0%, transparent 55%), radial-gradient(110% 80% at 85% 75%, #20303f 0%, transparent 60%), radial-gradient(70% 60% at 60% 35%, #3a3128 0%, transparent 65%), #11161c",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/30" />

              <div className="relative z-[1] flex w-full flex-col justify-between gap-10 p-7 md:flex-row md:p-[46px]">
                <h3 className="home-serif text-[1.75rem] leading-[1.05] text-white md:text-[2.75rem]">
                  Why HiringNexus?
                </h3>

                <div className="flex w-full flex-col md:w-auto md:flex-row md:self-stretch">
                  <div className="flex w-full flex-col rounded-xl bg-white/95 p-2 backdrop-blur-[10px] md:w-[452px] md:max-w-none">
                    {WHY_ITEMS.map((item, index) => {
                      const isSelected = whyIdx === index;
                      return (
                        <React.Fragment key={item.label}>
                          <button
                            type="button"
                            onClick={() => {
                              if (whyIdx === index) {
                                setWhyIdx(null);
                              } else {
                                setActiveWhy(index);
                                setWhyIdx(index);
                              }
                            }}
                            aria-expanded={isSelected}
                            className={`home-template-row group flex flex-1 items-center gap-3 border-t-[0.5px] border-[#e1e1e1] px-4 py-4 text-left first:border-t-0 cursor-pointer ${
                              isSelected ? "rounded-lg bg-[#f3f3f1]" : ""
                            }`}
                          >
                            <span className="shrink-0 text-[#0a0e19]">{item.icon}</span>
                            <span className="flex-1 text-[15px]">{item.label}</span>
                            <span className="home-row-arrow text-[#397554]">→</span>
                          </button>

                          {/* Mobile expand */}
                          <div
                            className={`home-detail min-[1200px]:hidden ${
                              isSelected ? "home-detail-open" : ""
                            }`}
                            aria-hidden={!isSelected}
                          >
                            <div className="home-detail-inner">
                              <div className="rounded-lg bg-[#f3f3f1] px-4 py-5">
                                <h4 className="pr-8 text-lg leading-[1.2] md:text-xl font-medium">
                                  {item.detail.title}
                                </h4>
                                <p className="mt-4 text-[15px] leading-[1.55] text-[#636363]">
                                  {item.detail.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Desktop side detail */}
                  <aside
                    className={`home-detail hidden shrink-0 min-[1200px]:block ${
                      whyIdx !== null ? "home-detail-open" : ""
                    }`}
                    aria-hidden={whyIdx === null}
                  >
                    <div className="home-detail-inner">
                      <div className="relative h-full rounded-xl bg-white/95 p-6 backdrop-blur-[10px] md:p-7 flex flex-col justify-start">
                        <button
                          type="button"
                          onClick={() => setWhyIdx(null)}
                          aria-label="Close detail window"
                          className="absolute right-5 top-5 text-xl leading-none text-[#818181] transition-colors hover:text-[#0a0e19] cursor-pointer"
                          tabIndex={whyIdx === null ? -1 : 0}
                        >
                          ×
                        </button>
                        <h4 className="pr-8 text-lg leading-[1.2] md:text-xl font-medium">
                          {currentWhyDetail.title}
                        </h4>
                        <p className="mt-4 text-[15px] leading-[1.55] text-[#636363]">
                          {currentWhyDetail.body}
                        </p>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <Link href="/auth/login" className="home-arrow-link cursor-pointer">
                Sign In to Platform <span className="home-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-12 md:h-20" aria-hidden="true" />

        {/* Security Section */}
        <div id="security" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
              <div className="home-card rounded-xl px-6 py-10 md:px-16 md:py-14">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#397554] font-semibold">
                    Security & Integrity
                  </p>
                  <h2 className="home-serif mt-4 text-[2rem] leading-[1.05] md:text-[3rem] text-[#0a0e19]">
                    Your code is in good hands.
                  </h2>
                  <p className="mt-4 max-w-[36rem] text-[15px] text-[#636363] md:text-base">
                    We index public repositories and user-consented telemetry only. Zero private key
                    exposure, SOC 2 aligned data controls, and row-level database isolation for
                    every organization.
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setWaitlistOpen(true)}
                      className="home-btn home-btn-moss cursor-pointer"
                    >
                      Get Access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* Testimonial Quote */}
        <section>
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
            <div className="rounded-xl bg-[#1e3c2c] px-6 py-16 text-center md:px-12 md:py-20 lg:px-[17%] lg:py-[7.5rem]">
              <blockquote className="home-serif mx-auto max-w-[70.5rem] text-[1.75rem] leading-[1.1] text-[#f9f9f9] md:text-[2.5rem] lg:text-[3.25rem]">
                “HiringNexus completely eliminated our leetcode screening round. Seeing a candidate’s
                actual PR telemetry gave us 10x more signal than five whiteboard interviews.”
              </blockquote>
              <p className="mt-6 text-sm text-[#dbefdb]/80 md:text-base">
                Marcus Thorne, VP of Engineering · Distributed Systems Lab
              </p>
            </div>
          </div>
        </section>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* FAQ Section */}
        <div id="faq" className="scroll-mt-24">
          <section>
            <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
              <h2 className="text-center text-base md:text-lg">
                What teams usually ask before connecting HiringNexus. Still have a question?{" "}
                <button
                  type="button"
                  onClick={() => setWaitlistOpen(true)}
                  className="cursor-pointer text-[#397554] underline-offset-2 hover:underline"
                >
                  Get in touch
                </button>{" "}
                and ask us anything.
              </h2>

              <div className="mx-auto mt-8 flex max-w-[51rem] flex-col gap-2">
                {FAQS.map((item, idx) => {
                  const isOpen = !!faqOpenStates[idx];
                  return (
                    <div key={item.question} className="home-card rounded-xl">
                      <h3>
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left md:p-8"
                        >
                          <span className="text-lg leading-[1.2] md:text-xl font-medium">
                            {item.question}
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="#818181"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            aria-hidden="true"
                            className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            <path d="M7 1v12M1 7h12" />
                          </svg>
                        </button>
                      </h3>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`px-6 pb-6 text-sm leading-[1.5] text-[#636363] transition-opacity duration-300 motion-reduce:transition-none md:px-8 md:pb-8 md:text-[15px] ${
                              isOpen ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="h-16 md:h-40" aria-hidden="true" />

        {/* Final CTA */}
        <section className="pb-16 md:pb-32">
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
            <h2 className="text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:text-[2.5rem] md:leading-[0.98] text-[#0a0e19]">
              Welcome to the future of engineering hiring.
            </h2>
            <p className="mt-4 text-[#636363]">
              Leave your work email and we&apos;ll set your team up, or sign in to explore verified
              talent.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/user/dashboard"
                className="home-btn home-btn-fill cursor-pointer"
              >
                Explore Verified Talent
              </Link>
              <Link href="/auth/login" className="home-btn home-btn-outline">
                Sign In
              </Link>
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

              {/* Links */}
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
                        <Link href="/user/dashboard" className="home-footer-link hover:text-[#0a0e19]">
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

            {/* Bottom Row */}
            <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#f2f2f2] pt-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-70 text-[#636363]">
                <span>© 2026 HiringNexus Inc.</span>
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

      {/* Waitlist Modal */}
      <GlenWaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
