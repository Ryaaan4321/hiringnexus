"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Briefcase } from "lucide-react";
import AdminJobItem from "@/components/admin/AdminJobItem";
import { getalljobs } from "@/app/actions/jobsserveraction";
import { jobinterface } from "@/interfaces/jobinterface";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<jobinterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getalljobs();
        setJobs(data || []);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleJobDeleted = (deletedId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== deletedId));
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (j.companyname && j.companyname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (j.location && j.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e1e1e1] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Role Lifecycle Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
            Active Role Specifications
          </h1>
          <p className="mt-1 text-sm text-[#636363]">
            Manage, verify, and audit all job listings active on the candidate board.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/createjob"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#0a0e19] px-3.5 py-1.5 text-xs font-mono font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Role</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs font-mono text-[#636363]">
          Showing <strong>{filteredJobs.length}</strong> of {jobs.length} listed roles
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#818181]" />
          <input
            type="text"
            placeholder="Search roles by title, company, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-[#e1e1e1] bg-white pl-9 pr-3 py-1.5 text-xs text-[#0a0e19] placeholder-[#a0a0a0] focus:border-[#0a0e19] focus:outline-none"
          />
        </div>
      </div>
      <div className="rounded-xl border border-[#e1e1e1] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e1e1e1] bg-[#fafafa] font-mono text-[#636363]">
                <th className="px-5 py-3 font-normal">ROLE & EMPLOYER</th>
                <th className="px-5 py-3 font-normal">MODALITY</th>
                <th className="px-5 py-3 font-normal">COMPENSATION</th>
                <th className="px-5 py-3 font-normal">LOCATION</th>
                <th className="px-5 py-3 font-normal text-right">MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <AdminJobItem
                  key={job.id}
                  job={job}
                  onDeleted={handleJobDeleted}
                />
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-xs font-mono text-[#818181]">
                    {loading ? "Loading roles..." : "No matching roles found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
