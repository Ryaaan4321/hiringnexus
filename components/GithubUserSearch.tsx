"use client";

import { useState } from "react";
import { GitBranch, Search, ShieldCheck } from "lucide-react";

export default function GithubUserSearch({
  onSearch,
}: {
  onSearch: (username: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        onSearch(username.trim());
        setIsSearching(false);
      }, 600);
    }
  };

  return (
    <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white shadow-xs p-7 sm:p-8 space-y-6">
      <div className="space-y-2 pb-6 border-b border-[#e1e1e1]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#818181] uppercase tracking-wider">
            Telemetry Ingestion · Proof of Work
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#397554]" />
        </div>
        <h3 className="home-serif text-2xl font-normal tracking-tight text-[#0a0e19]">
          Link GitHub Engineering Signals
        </h3>
        <p className="text-sm text-[#636363] leading-relaxed font-sans">
          Index your repositories, commit artifacts, and technical depth. Employers evaluate direct engineering output rather than resume claims.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="github-username"
            className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
          >
            GitHub Account Handle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#818181]">
              <span className="font-mono text-xs">@</span>
            </div>
            <input
              id="github-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds or yourhandle"
              className="w-full h-11 pl-8 pr-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm font-mono text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
              disabled={isSearching}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSearching || !username.trim()}
          className="home-btn home-btn-fill w-full h-11 text-xs font-medium cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin">○</span>
              <span>Querying GitHub Public Telemetry...</span>
            </div>
          ) : (
            <>
              <GitBranch className="w-3.5 h-3.5" />
              <span>Ingest & Verify GitHub Repositories</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#636363]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#397554] shrink-0" />
        <span>Read-only public API integration · No private access requested</span>
      </div>
    </div>
  );
}
