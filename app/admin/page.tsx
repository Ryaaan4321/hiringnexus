"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight, Briefcase, Users, ShieldAlert, Sparkles } from "lucide-react";
import AdminMetrics from "@/components/admin/AdminMetrics";
import AdminJobItem from "@/components/admin/AdminJobItem";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { getalljobs } from "@/app/actions/jobsserveraction";
import { getallusers } from "@/app/actions/userserveraction";
import { getalladmins } from "@/app/actions/adminserveraction";
import { jobinterface } from "@/interfaces/jobinterface";
import userinterface from "@/interfaces/userinterface";

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<jobinterface[]>([]);
  const [users, setUsers] = useState<userinterface[]>([]);
  const [adminCount, setAdminCount] = useState<number>(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [jobsData, usersData, adminsData] = await Promise.all([
          getalljobs().catch(() => []),
          getallusers().catch(() => []),
          getalladmins().catch(() => []),
        ]);
        setJobs(jobsData || []);
        setUsers(usersData || []);
        setAdminCount(adminsData?.length || 2);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handleJobDeleted = (deletedId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== deletedId));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e1e1e1] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Root System Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
            Systems Administration & Global Telemetry
          </h1>
          <p className="mt-1 text-sm text-[#636363]">
            Platform-wide operations, role listings, and verified candidate indexing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/createjob"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#0a0e19] px-3.5 py-1.5 text-xs font-mono font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post New Role</span>
          </Link>
        </div>
      </div>
      <AdminMetrics
        totalJobs={jobs.length}
        totalUsers={users.length}
        totalAdmins={adminCount}
        telemetryRatio="96.8%"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#e1e1e1] bg-white shadow-xs overflow-hidden">
          <div className="border-b border-[#e1e1e1] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0a0e19]" />
              <h2 className="text-sm font-medium text-[#0a0e19] font-serif">Recent Role Postings</h2>
            </div>
            <Link
              href="/admin/jobs"
              className="text-xs font-mono text-[#636363] hover:text-[#0a0e19] inline-flex items-center gap-1"
            >
              <span>View all ({jobs.length})</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <tbody>
                {jobs.slice(0, 5).map((job) => (
                  <AdminJobItem
                    key={job.id}
                    job={job}
                    onDeleted={handleJobDeleted}
                  />
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-center text-xs font-mono text-[#818181]">
                      {loading ? "Loading roles..." : "No roles currently active."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-[#e1e1e1] bg-white shadow-xs overflow-hidden">
          <div className="border-b border-[#e1e1e1] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0a0e19]" />
              <h2 className="text-sm font-medium text-[#0a0e19] font-serif">Candidate Roster</h2>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-mono text-[#636363] hover:text-[#0a0e19] inline-flex items-center gap-1"
            >
              <span>Directory ({users.length})</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <tbody>
                {users.slice(0, 5).map((user) => (
                  <AdminUserItem key={user.id} user={user} />
                ))}
                {users.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-center text-xs font-mono text-[#818181]">
                      {loading ? "Loading directory..." : "No candidates registered."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}