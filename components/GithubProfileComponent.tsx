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
    <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white shadow-xs p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e1e1e1]">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl || "/placeholder.svg"}
            alt="GitHub Profile Avatar"
            className="w-14 h-14 rounded-full border border-[#e1e1e1] object-cover"
          />
          <div>
            <h3 className="home-serif text-2xl font-normal text-[#0a0e19]">
              {profile.name || profile.username}
            </h3>
            <p className="text-xs text-[#636363] font-sans mt-0.5 line-clamp-2">
              {profile.bio || "No technical manifesto provided on GitHub"}
            </p>
            <a
              href={profile.htmlUrl || profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#818181] hover:text-[#0a0e19] transition-colors mt-1 inline-block"
            >
              @{profile.username}
            </a>
          </div>
        </div>

        <a
          href={profile.htmlUrl || profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="home-btn home-btn-glass text-xs shrink-0 inline-flex items-center gap-1.5"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-5">
        <div className="p-3.5 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-center">
          <div className="home-serif text-2xl font-normal text-[#0a0e19]">
            {profile.followers ?? 0}
          </div>
          <div className="text-[11px] font-mono text-[#818181] uppercase tracking-wider mt-0.5">
            Followers
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-center">
          <div className="home-serif text-2xl font-normal text-[#0a0e19]">
            {profile.following ?? 0}
          </div>
          <div className="text-[11px] font-mono text-[#818181] uppercase tracking-wider mt-0.5">
            Following
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-center">
          <div className="home-serif text-2xl font-normal text-[#0a0e19]">
            {profile.publicRepos ?? 0}
          </div>
          <div className="text-[11px] font-mono text-[#818181] uppercase tracking-wider mt-0.5">
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
    <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white shadow-xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#e1e1e1]">
        <div>
          <span className="font-mono text-xs text-[#818181] uppercase tracking-wider">
            Artifacts · Code Telemetry
          </span>
          <h3 className="home-serif text-xl font-normal text-[#0a0e19] mt-0.5">
            Verified Public Repositories
          </h3>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#cecece] bg-[#fcfcfc] text-[#636363]">
          {repositories.length} Total
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {repositories.slice(0, 6).map((repo: any) => (
          <div
            key={repo.id}
            className="p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] hover:border-[#0a0e19] hover:bg-white transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <a
                  href={repo.htmlUrl || repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm text-[#0a0e19] hover:underline underline-offset-2 transition-colors truncate"
                >
                  {repo.name}
                </a>
                <ExternalLink className="w-3.5 h-3.5 text-[#818181] group-hover:text-[#0a0e19] shrink-0 mt-0.5" />
              </div>

              <p className="text-xs text-[#636363] line-clamp-2 leading-relaxed mb-3">
                {repo.description || "No technical description recorded."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#e1e1e1] text-xs font-mono text-[#636363]">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="text-[11px]">{repo.language || "Unknown"}</span>
              </div>

              {(repo.stargazers_count > 0 || repo.stargazersCount > 0) && (
                <div className="flex items-center gap-1 text-[11px]">
                  <Star className="w-3 h-3 text-[#818181]" />
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
