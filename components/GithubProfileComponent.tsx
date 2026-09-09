"use client";

import { ExternalLink, Star, GitFork, BookOpen } from "lucide-react";

const getLanguageColor = (language: string | null): string => {
  const languageColors: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    TypeScript: "#3178C6",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    CSS: "#563d7c",
    HTML: "#e34f26",
    C: "#555555",
  };
  return languageColors[language || ""] || "#737373";
};

export function RenderGithubProfile({ profile }: { profile: any }) {
  if (!profile) return null;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl || "/placeholder.svg"}
            alt="GitHub Profile Avatar"
            className="w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover"
          />
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {profile.name || profile.username}
            </h3>
            <p className="text-xs text-neutral-500 font-sans mt-0.5 line-clamp-2">
              {profile.bio || "No technical manifesto provided on GitHub"}
            </p>
            <a
              href={profile.htmlUrl || profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mt-1 inline-block"
            >
              @{profile.username}
            </a>
          </div>
        </div>

        <a
          href={profile.htmlUrl || profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hb-bracket inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
        >
          <span className="bracket">[ </span>
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="bracket"> ]</span>
        </a>
      </div>

      {/* GitHub Telemetry Stats Grid */}
      <div className="grid grid-cols-3 gap-3 pt-5">
        <div className="p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 text-center">
          <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
            {profile.followers ?? 0}
          </div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
            Followers
          </div>
        </div>

        <div className="p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 text-center">
          <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
            {profile.following ?? 0}
          </div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
            Following
          </div>
        </div>

        <div className="p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 text-center">
          <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
            {profile.publicRepos ?? 0}
          </div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
            Public Repos
          </div>
        </div>
      </div>
    </div>
  );
}

export function RenderGithubRepositories({ repositories }: { repositories: any[] }) {
  if (!repositories || repositories.length === 0) return null;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            [ ARTIFACTS // CODE_TELEMETRY ]
          </span>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
            Verified Public Repositories
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          {repositories.length} Total
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {repositories.slice(0, 6).map((repo: any) => (
          <div
            key={repo.id}
            className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/30 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <a
                  href={repo.htmlUrl || repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-white transition-colors truncate"
                >
                  {repo.name}
                </a>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 shrink-0 mt-0.5" />
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                {repo.description || "No technical description recorded."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-850 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="text-[11px]">{repo.language || "Unknown"}</span>
              </div>

              {(repo.stargazers_count > 0 || repo.stargazersCount > 0) && (
                <div className="flex items-center gap-1 text-[11px]">
                  <Star className="w-3 h-3 text-neutral-400" />
                  <span>{repo.stargazers_count || repo.stargazersCount}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
