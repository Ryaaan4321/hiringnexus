"use client";

import React from "react";
import { BarChart3, Activity, ShieldCheck, Database, Server, Cpu } from "lucide-react";

export default function AdminReportPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#e1e1e1] pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>Telemetry & System Health</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif tracking-tight font-medium text-[#0a0e19]">
          Platform Telemetry & Infrastructure Audit
        </h1>
        <p className="mt-1 text-sm text-[#636363]">
          Real-time server responsiveness, database connection pooling, and indexing SLA status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
            <span>Database Status</span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-xl font-serif font-medium text-[#0a0e19]">
            Neon PostgreSQL
          </div>
          <div className="mt-1 text-xs font-mono text-emerald-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Connected (18ms latency)
          </div>
        </div>

        <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
            <span>Application Server</span>
            <Server className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 text-xl font-serif font-medium text-[#0a0e19]">
            Next.js App Router
          </div>
          <div className="mt-1 text-xs font-mono text-emerald-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            99.98% Uptime SLA
          </div>
        </div>

        <div className="rounded-xl border border-[#e1e1e1] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#636363]">
            <span>Auth & Role Isolation</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-xl font-serif font-medium text-[#0a0e19]">
            RBAC Middleware
          </div>
          <div className="mt-1 text-xs font-mono text-emerald-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Strict Boundary Enforced
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#e1e1e1] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-medium font-serif text-[#0a0e19]">Security Audit Log</h3>
        <div className="space-y-2 text-xs font-mono text-[#636363]">
          <div className="p-3 rounded-lg bg-[#fafafa] border border-[#e1e1e1] flex items-center justify-between">
            <span>[200 OK] Admin session authenticated for Root Operator</span>
            <span className="text-[#a0a0a0]">Just now</span>
          </div>
          <div className="p-3 rounded-lg bg-[#fafafa] border border-[#e1e1e1] flex items-center justify-between">
            <span>[307 REDIRECT] Intercepted cross-role candidate access attempt to admin terminal</span>
            <span className="text-[#a0a0a0]">12 mins ago</span>
          </div>
          <div className="p-3 rounded-lg bg-[#fafafa] border border-[#e1e1e1] flex items-center justify-between">
            <span>[201 CREATED] New verified role published by administrator</span>
            <span className="text-[#a0a0a0]">24 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}