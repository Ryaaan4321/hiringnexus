"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminCreateJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "FULLTIME",
    description: "",
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");
    setErrorMsg(null);

    const payload = {
      title: formData.title.trim(),
      companyName: formData.companyName.trim(),
      salary: Number.parseInt(formData.salary) || 0,
      experience: Number.parseInt(formData.experience) || 0,
      location: formData.location.trim(),
      jobTypes: [formData.jobType],
      description: formData.description.trim(),
      link: formData.link.trim(),
    };

    try {
      const response = await fetch("/api/admin/jobpost", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.msg || "Failed to post job");
      }

      setSubmitStatus("success");
      setTimeout(() => {
        router.push("/admin/jobs");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong while publishing the role.");
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-[#e1e1e1] pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Role Publication Mandate</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
          Publish New Verified Role
        </h1>
        <p className="mt-1 text-sm text-[#636363]">
          Broadcast a systems engineering role to indexed builders and engineering students.
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Role published successfully! Redirecting to active roles...</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#e1e1e1] bg-white p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Role Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Systems Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Hiring Organization / Company *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Nexus Core Infrastructure"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Annual Salary (LPA / INR) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 24"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Min Experience (Years)
            </label>
            <input
              type="number"
              placeholder="0 (Freshers welcome)"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Work Modality
            </label>
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            >
              <option value="FULLTIME">Full-Time</option>
              <option value="REMOTE">Remote</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Bengaluru / Remote"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#636363] mb-1.5">
              Official Application URL
            </label>
            <input
              type="url"
              placeholder="https://company.com/apply"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#636363] mb-1.5">
            Role Architecture & Mandate Description *
          </label>
          <textarea
            required
            rows={5}
            placeholder="Describe technical stack, system design challenges, and expected code competencies..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg border border-[#e1e1e1] bg-[#fafafa] px-3.5 py-2 text-xs text-[#0a0e19] focus:bg-white focus:outline-none focus:border-[#0a0e19]"
          />
        </div>

        <div className="pt-4 flex items-center justify-end border-t border-[#e1e1e1]">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0a0e19] px-5 py-2 text-xs font-mono font-medium text-white hover:opacity-90 transition-opacity shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? "Publishing..." : "Publish Verified Role"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
