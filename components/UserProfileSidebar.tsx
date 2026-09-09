"use client";

import Link from "next/link";
import { userDetail } from "@/interfaces/userinterface";
import { useUserId } from "@/hooks/user";
import {
  Briefcase,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Edit3,
  Clock,
  FileText,
  ShieldCheck,
  Code2,
} from "lucide-react";

export default function UserProfileSidebar({ user }: { user: userDetail | null }) {
  const { userId } = useUserId();

  if (!user) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <p className="text-xs font-mono text-neutral-500">
          [ WAITING_FOR_CANDIDATE_DATA ]
        </p>
      </div>
    );
  }

  const isOwner = userId === user.id;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-6 space-y-6 sticky top-20">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-neutral-100 dark:border-neutral-800">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-2xl font-bold font-mono shadow-sm">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 mb-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>VERIFIED_ENGINEER</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-xs font-mono text-neutral-500 capitalize">
            {user.profession || "Software Engineer"}
          </p>
        </div>

        {isOwner && (
          <div className="mt-4 w-full">
            <Link
              href="/user/edit-page"
              className="hb-bracket w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="bracket">[ </span>
              <span>Edit Coordinates</span>
              <span className="bracket"> ]</span>
            </Link>
          </div>
        )}
      </div>

      {/* About / Manifesto */}
      {user.descreption && (
        <div className="space-y-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            [ TECHNICAL_MANIFESTO ]
          </span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans bg-neutral-50/60 dark:bg-neutral-950/60 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
            {user.descreption}
          </p>
        </div>
      )}

      {/* Core Verified Skills */}
      <div className="space-y-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            [ VERIFIED_SKILLS ]
          </span>
          <span className="text-[10px] font-mono text-neutral-400">
            {user.skills?.length || 0} indexed
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs font-mono text-neutral-400">
              No technical skills cataloged yet
            </span>
          )}
        </div>
      </div>

      {/* Resume Artifact */}
      {user.resumeURL && (
        <div className="space-y-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            [ RESUME_TELEMETRY ]
          </span>
          <a
            href={user.resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200">
                Verified Resume PDF
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors" />
          </a>
        </div>
      )}

      {/* Compensation & Location Coordinates */}
      <div className="space-y-2.5 pb-4 border-b border-neutral-100 dark:border-neutral-800 text-xs font-mono">
        <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
          [ PARAMETERS & COORDINATES ]
        </span>

        {user.ctc && (
          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="text-neutral-400">Target CTC:</span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              {user.ctc}
            </span>
          </div>
        )}

        {user.location && (
          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="text-neutral-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Base:
            </span>
            <span className="text-right truncate max-w-[160px]">{user.location}</span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="text-neutral-400 flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email:
            </span>
            <span className="truncate max-w-[160px]">{user.email}</span>
          </div>
        )}

        {user.phonenumber && (
          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="text-neutral-400 flex items-center gap-1">
              <Phone className="w-3 h-3" /> Phone:
            </span>
            <span>{user.phonenumber}</span>
          </div>
        )}
      </div>

      {/* Recent Viewed Roles */}
      {user.alreadyapplied && user.alreadyapplied.length > 0 && (
        <div className="space-y-2">
          <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            [ RECENT_ROLES_EXPLORED ]
          </span>
          <div className="space-y-1.5">
            {user.alreadyapplied.slice(0, 3).map((job: any) => (
              <Link
                key={job.id}
                href={`/user/job/${job.id}`}
                className="flex items-center justify-between p-2 rounded border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-850 text-xs transition-colors group"
              >
                <span className="truncate font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white">
                  {job.title}
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0 ml-1" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}