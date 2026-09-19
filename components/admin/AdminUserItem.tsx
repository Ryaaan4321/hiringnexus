"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import userinterface from "@/interfaces/userinterface";

interface AdminUserItemProps {
  user: userinterface;
}

export default function AdminUserItem({ user }: AdminUserItemProps) {
  const initials = (user.name || user.username || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const userRole = (user as any).role || "CANDIDATE";

  return (
    <tr className="hover:bg-[#fcfcfc] transition-colors border-b border-[#e1e1e1]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0a0e19] text-white flex items-center justify-center text-xs font-mono font-medium shrink-0">
            {initials}
          </div>
          <div>
            <div className="font-medium text-[#0a0e19] text-xs sm:text-sm">
              {user.name || user.username}
            </div>
            <div className="text-[11px] font-mono text-[#818181]">
              @{user.username}
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-xs font-mono text-[#636363]">
        {user.email}
      </td>
      <td className="px-5 py-4">
        <div className="text-xs text-[#0a0e19]">
          {user.profession || "Software Builder"}
        </div>
        <div className="mt-0.5">
          <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-mono ${userRole === "ADMIN"
            ? "bg-blue-50 text-blue-700 border border-blue-200"
            : userRole === "RECRUITER"
              ? "bg-purple-50 text-purple-700 border border-purple-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}>
            {userRole}
          </span>
        </div>
      </td>
      <td className="px-5 py-4 text-xs text-[#636363]">
        {user.location || "Remote"}
      </td>
      <td className="px-5 py-4 text-right">
        <Link
          href={`/user/test-profile/${user.id}`}
          className="inline-flex items-center gap-1 text-xs font-mono text-[#0a0e19] hover:underline"
        >
          <span>View Coordinates</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </td>
    </tr>
  );
}
