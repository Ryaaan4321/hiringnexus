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
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-7 sm:p-8 space-y-6">
      <div className="space-y-2 pb-6 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            [ TELEMETRY_INGESTION // PROOF_OF_WORK ]
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Link GitHub Engineering Signals
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed font-sans">
          Index your repositories, commit artifacts, and technical depth. Employers evaluate direct engineering output rather than resume claims.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="github-username"
            className="block text-xs font-mono text-neutral-500 uppercase tracking-wider"
          >
            GitHub Account Handle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <span className="font-mono text-xs">@</span>
            </div>
            <input
              id="github-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds or yourhandle"
              className="w-full h-11 pl-8 pr-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 text-sm font-mono text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
              disabled={isSearching}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSearching || !username.trim()}
          className="hb-bracket w-full h-11 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin">○</span>
              <span>[ Querying GitHub Public Telemetry... ]</span>
            </div>
          ) : (
            <>
              <span className="bracket">[ </span>
              <GitBranch className="w-3.5 h-3.5" />
              <span>Ingest & Verify GitHub Repositories</span>
              <span className="bracket"> ]</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Read-only public API integration · No private access requested</span>
      </div>
    </div>
  );
}
