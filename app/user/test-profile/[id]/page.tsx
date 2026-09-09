"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useUserDetails, useUserFromParam, useGithub, useUserId } from "@/hooks/user";
import { getUserRepositories, getGithubProfile, saveGithubData } from "@/lib/github";
import { GitHubRepository, GitHubProfile } from "@/interfaces/githubinterface";
import { RenderGithubProfile, RenderGithubRepositories } from "@/components/GithubProfileComponent";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import GithubUserSearch from "@/components/GithubUserSearch";

export default function ProfilePreview() {
  const { completeUser, userloading } = useUserDetails();
  const { user: paramUser } = useUserFromParam();
  const { userId } = useUserId();
  const { userGithubprofile, userGithubrepositories } = useGithub();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetUser = paramUser || completeUser;
  const isOwner = userId && targetUser ? userId === targetUser.id : false;

  // Repositories from DB profile or Redux state
  const repos =
    targetUser?.githubprofile?.repositories && targetUser.githubprofile.repositories.length > 0
      ? targetUser.githubprofile.repositories
      : userGithubrepositories;

  const githubProfile = targetUser?.githubprofile || userGithubprofile;

  const handleSearch = async (searchUsername: string) => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await getGithubProfile(searchUsername);
      const repoData = await getUserRepositories(searchUsername);
      if (!userId) {
        throw new Error("Authentication required. Please log in first.");
      }
      await saveGithubData(userId, profileData, repoData);
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to ingest GitHub telemetry.");
    } finally {
      setLoading(false);
    }
  };

  const handleShareClick = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!targetUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950 text-neutral-500 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
          <span>[ Loading candidate engineering telemetry... ]</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[ Back to Opportunities Pipeline ]</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-xs text-neutral-400">
              [ VERIFIED_PROFILE // {targetUser.id.slice(0, 8)} ]
            </span>
            <button
              onClick={handleShareClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>[ Link Copied ]</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>[ Share Artifact ]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Candidate Sidebar */}
          <div className="lg:col-span-1">
            <UserProfileSidebar user={targetUser} />
          </div>

          {/* Right Column: GitHub Telemetry / Verification */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 text-xs font-mono text-red-700 dark:text-red-300">
                [ TELEMETRY_ERROR ]: {error}
              </div>
            )}

            {githubProfile || (repos && repos.length > 0) ? (
              <div className="space-y-6">
                {githubProfile && <RenderGithubProfile profile={githubProfile} />}
                {repos && repos.length > 0 && (
                  <RenderGithubRepositories repositories={repos} />
                )}
              </div>
            ) : isOwner ? (
              <GithubUserSearch onSearch={handleSearch} />
            ) : (
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center space-y-2">
                <span className="font-mono text-xs text-neutral-400">
                  [ NO_PUBLIC_GITHUB_TELEMETRY ]
                </span>
                <p className="text-xs text-neutral-500">
                  This candidate has not connected public GitHub repositories yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
