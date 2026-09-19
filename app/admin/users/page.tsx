"use client";

import React, { useEffect, useState } from "react";
import { Users, Search } from "lucide-react";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { getallusers } from "@/app/actions/userserveraction";
import userinterface from "@/interfaces/userinterface";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<userinterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getallusers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.profession && u.profession.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e1e1e1] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Talent Ingestion & Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
            Candidate & User Directory
          </h1>
          <p className="mt-1 text-sm text-[#636363]">
            Audit all registered developers, builders, and recruiters indexed across HiringNexus.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs font-mono text-[#636363]">
          Showing <strong>{filteredUsers.length}</strong> of {users.length} registered accounts
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#818181]" />
          <input
            type="text"
            placeholder="Search candidates by name, handle, email..."
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
                <th className="px-5 py-3 font-normal">CANDIDATE</th>
                <th className="px-5 py-3 font-normal">EMAIL</th>
                <th className="px-5 py-3 font-normal">PROFESSION & ROLE</th>
                <th className="px-5 py-3 font-normal">LOCATION</th>
                <th className="px-5 py-3 font-normal text-right">PROFILE</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <AdminUserItem key={user.id} user={user} />
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-xs font-mono text-[#818181]">
                    {loading ? "Loading directory..." : "No candidates found."}
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