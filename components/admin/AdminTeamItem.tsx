"use client";

import React from "react";
import { Shield, Check, Briefcase } from "lucide-react";
import { adminwithjobcountinterface } from "@/app/actions/adminserveraction";

interface AdminTeamItemProps {
  admin: adminwithjobcountinterface;
}

export default function AdminTeamItem({ admin }: AdminTeamItemProps) {
  return (
    <tr className="hover:bg-[#fcfcfc] transition-colors border-b border-[#e1e1e1]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-mono font-medium">
            <Shield className="w-4 h-4 text-blue-200" />
          </div>
          <div>
            <div className="font-medium text-[#0a0e19] text-xs sm:text-sm">
              {admin.username}
            </div>
            <div className="text-[11px] font-mono text-[#818181]">
              Root Administrator
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-xs font-mono text-[#636363]">
        {admin.email}
      </td>

      <td className="px-5 py-4 text-xs font-mono text-[#0a0e19]">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f0f0f0] border border-[#cecece]">
          <Briefcase className="w-3 h-3 text-[#636363]" />
          <span>{admin.jobcount} Jobs Managed</span>
        </div>
      </td>

      <td className="px-5 py-4 text-right">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Check className="w-3 h-3" />
          Full SuperAdmin
        </span>
      </td>
    </tr>
  );
}
