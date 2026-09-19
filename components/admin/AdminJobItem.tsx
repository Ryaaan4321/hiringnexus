"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ExternalLink, Users, AlertCircle } from "lucide-react";
import { deleteJob } from "@/app/actions/adminserveraction";
import { jobinterface } from "@/interfaces/jobinterface";

interface AdminJobItemProps {
  job: jobinterface;
  onDeleted?: (id: string) => void;
}

export default function AdminJobItem({ job, onDeleted }: AdminJobItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const res = await deleteJob(job.id);
      if (res.success) {
        if (onDeleted) onDeleted(job.id);
      } else {
        setErrorMsg(res.msg || "Failed to delete role");
        setIsDeleting(false);
      }
    } catch {
      setErrorMsg("Network error occurred");
      setIsDeleting(false);
    }
  };

  const employerName =
    job.postedby?.name || job.postedbyUser?.name || "Direct Employer";

  return (
    <tr className="hover:bg-[#fcfcfc] transition-colors border-b border-[#e1e1e1]">
      <td className="px-5 py-4">
        <div>
          <div className="font-medium text-[#0a0e19] text-xs sm:text-sm font-sans">
            {job.title}
          </div>
          <div className="text-[11px] font-mono text-[#636363] mt-0.5">
            {employerName} • {job.companyname || "Verified Partner"}
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-xs font-mono text-[#636363]">
        <div>{job.jobTypes?.join(", ") || "Full-Time"}</div>
        <div className="text-[11px] text-[#a0a0a0] mt-0.5">
          {job.experience ? `${job.experience}+ yrs exp` : "Freshers welcome"}
        </div>
      </td>

      <td className="px-5 py-4 text-xs font-mono text-[#0a0e19]">
        {job.salary ? `₹${job.salary} LPA` : "Competitive"}
      </td>

      <td className="px-5 py-4 text-xs text-[#636363]">
        {job.location || "Remote"}
      </td>

      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {job.joblink && (
            <Link
              href={job.joblink}
              target="_blank"
              className="p-1.5 rounded-md text-[#636363] hover:text-[#0a0e19] hover:bg-[#eaeaea] transition-colors"
              title="Visit external application portal"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          {showConfirm ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-mono transition-colors"
              >
                {isDeleting ? "..." : "Confirm"}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-2 py-1 bg-[#eaeaea] hover:bg-[#dedede] text-[#0a0e19] rounded text-[10px] font-mono transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="p-1.5 rounded-md text-[#818181] hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete role"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {errorMsg && (
          <div className="text-[10px] text-red-600 font-mono mt-1 text-right">
            {errorMsg}
          </div>
        )}
      </td>
    </tr>
  );
}
