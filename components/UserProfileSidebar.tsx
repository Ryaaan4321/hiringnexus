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
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function UserProfileSidebar({ user }: { user: userDetail | null }) {
  const { userId } = useUserId();

  if (!user) {
    return (
      <div className="home-card rounded-2xl p-8 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-[#f2f2f2] flex items-center justify-center mx-auto text-[#818181]">
          <ShieldCheck className="w-5 h-5 text-[#397554]" />
        </div>
        <p className="text-xs font-mono text-[#818181]">
          WAITING_FOR_CANDIDATE_DATA
        </p>
      </div>
    );
  }

  const isOwner = userId === user.id;

  return (
    <div className="home-card rounded-2xl p-5 sm:p-6 space-y-6 lg:sticky lg:top-20 shadow-xs">
      <div className="flex flex-col items-center text-center pb-6 border-b border-[#e1e1e1]">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-[#0a0e19] text-white flex items-center justify-center text-2xl font-normal home-serif shadow-sm">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#397554] border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] mb-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Engineer</span>
          </div>
          <h2 className="home-serif text-2xl font-normal text-[#0a0e19]">
            {user.name}
          </h2>
          <p className="text-xs font-mono text-[#636363] capitalize">
            {user.profession || "Software Engineer"}
          </p>
        </div>

        {isOwner && (
          <div className="mt-4 w-full">
            <Link
              href="/user/edit-page"
              className="home-btn home-btn-outline w-full text-xs flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile Details</span>
            </Link>
          </div>
        )}
      </div>
      {user.descreption && (
        <div className="space-y-2 pb-4 border-b border-[#e1e1e1]">
          <span className="block font-mono text-[10px] text-[#818181] uppercase tracking-wider">
            Technical Summary
          </span>
          <p className="text-xs text-[#636363] leading-relaxed bg-[#f9f9f9] p-3 rounded-lg border border-[#e1e1e1]">
            {user.descreption}
          </p>
        </div>
      )}

      
      <div className="space-y-2 pb-4 border-b border-[#e1e1e1]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#818181] uppercase tracking-wider">
            Verified Skills
          </span>
          <span className="text-[10px] font-mono text-[#818181]">
            {user.skills?.length || 0} indexed
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#f2f2f2] text-[#0a0e19] border border-[#e1e1e1]"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs font-mono text-[#818181]">
              No technical skills cataloged yet
            </span>
          )}
        </div>
      </div>

      
      {user.resumeURL && (
        <div className="space-y-2 pb-4 border-b border-[#e1e1e1]">
          <span className="block font-mono text-[10px] text-[#818181] uppercase tracking-wider">
            Resume Artifact
          </span>
          <a
            href={user.resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg border border-[#e1e1e1] bg-[#f9f9f9] hover:bg-[#f2f2f2] transition-colors group"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#397554]" />
              <span className="text-xs font-medium text-[#0a0e19]">
                Verified Resume PDF
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#818181] group-hover:text-[#0a0e19] transition-colors" />
          </a>
        </div>
      )}

      
      <div className="space-y-2.5 pb-4 border-b border-[#e1e1e1] text-xs font-mono">
        <span className="block text-[10px] text-[#818181] uppercase tracking-wider">
          Parameters
        </span>

        {user.ctc && (
          <div className="flex items-center justify-between text-[#636363]">
            <span className="text-[#818181]">Target CTC:</span>
            <span className="font-medium text-[#0a0e19]">{user.ctc}</span>
          </div>
        )}

        {user.location && (
          <div className="flex items-center justify-between text-[#636363]">
            <span className="text-[#818181] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#397554]" /> Location:
            </span>
            <span className="text-right truncate max-w-[160px] text-[#0a0e19]">
              {user.location}
            </span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center justify-between text-[#636363]">
            <span className="text-[#818181] flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#397554]" /> Email:
            </span>
            <span className="truncate max-w-[160px] text-[#0a0e19]">{user.email}</span>
          </div>
        )}

        {user.phonenumber && (
          <div className="flex items-center justify-between text-[#636363]">
            <span className="text-[#818181] flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#397554]" /> Phone:
            </span>
            <span className="text-[#0a0e19]">{user.phonenumber}</span>
          </div>
        )}
      </div>

      
      {user.alreadyapplied && user.alreadyapplied.length > 0 && (
        <div className="space-y-2">
          <span className="block font-mono text-[10px] text-[#818181] uppercase tracking-wider">
            Recent Roles Explored
          </span>
          <div className="space-y-1.5">
            {user.alreadyapplied.slice(0, 3).map((job: any) => (
              <Link
                key={job.id}
                href={`/user/job/${job.id}`}
                className="flex items-center justify-between p-2 rounded-lg border border-[#e1e1e1] hover:bg-[#f2f2f2] text-xs transition-colors group"
              >
                <span className="truncate font-medium text-[#0a0e19]">
                  {job.title}
                </span>
                <ExternalLink className="w-3 h-3 text-[#818181] shrink-0 ml-1" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}