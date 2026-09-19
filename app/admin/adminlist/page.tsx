"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, UserPlus } from "lucide-react";
import AdminTeamItem from "@/components/admin/AdminTeamItem";
import CreateAdminModal from "@/components/admin/CreateAdminModal";
import { getalladmins, adminwithjobcountinterface } from "@/app/actions/adminserveraction";

export default function AdminListPage() {
  const [admins, setAdmins] = useState<adminwithjobcountinterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAdmins = async () => {
    try {
      const data = await getalladmins();
      setAdmins(data || []);
    } catch (err) {
      console.error("Failed to load admin roster:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e1e1e1] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Root Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
            Administrative Team Roster
          </h1>
          <p className="mt-1 text-sm text-[#636363]">
            Privileged administrators capable of posting, deleting, and auditing global platform operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#0a0e19] px-3.5 py-1.5 text-xs font-mono font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Administrator</span>
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-[#e1e1e1] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e1e1e1] bg-[#fafafa] font-mono text-[#636363]">
                <th className="px-5 py-3 font-normal">ADMINISTRATOR</th>
                <th className="px-5 py-3 font-normal">EMAIL COORDINATES</th>
                <th className="px-5 py-3 font-normal">MANAGED ROLES</th>
                <th className="px-5 py-3 font-normal text-right">SECURITY PRIVILEGE</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((adm) => (
                <AdminTeamItem key={adm.id} admin={adm} />
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-xs font-mono text-[#818181]">
                    {loading ? "Loading admin roster..." : "No administrators registered."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CreateAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdminCreated={loadAdmins}
      />
    </div>
  );
}