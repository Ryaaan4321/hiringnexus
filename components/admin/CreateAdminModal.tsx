"use client";

import React, { useState } from "react";
import { X, ShieldPlus, AlertCircle, CheckCircle2 } from "lucide-react";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminCreated?: () => void;
}

export default function CreateAdminModal({
  isOpen,
  onClose,
  onAdminCreated,
}: CreateAdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phonenumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phonenumber: formData.phonenumber.trim() || "+15550000000",
          canPostJob: true,
          canDeleteJob: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.msg || "Failed to create administrator.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Administrator provisioned successfully!");
      setLoading(false);
      setTimeout(() => {
        onClose();
        if (onAdminCreated) onAdminCreated();
      }, 1000);
    } catch {
      setErrorMsg("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl border border-[#e1e1e1] bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#e1e1e1]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-blue-50 text-blue-700">
              <ShieldPlus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-medium font-serif text-[#0a0e19]">
              Provision Administrator
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#818181] hover:text-[#0a0e19] hover:bg-[#eaeaea] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jordan Miller"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] px-3 py-2 text-xs text-[#0a0e19] focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. jordan_admin"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] px-3 py-2 text-xs text-[#0a0e19] focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@hiringnexus.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] px-3 py-2 text-xs text-[#0a0e19] focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1">
              Secure Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] px-3 py-2 text-xs text-[#0a0e19] focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#e1e1e1]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-[#cecece] text-xs font-mono text-[#636363] hover:text-[#0a0e19] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 rounded-lg bg-[#0a0e19] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity"
            >
              {loading ? "Provisioning..." : "Provision Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
