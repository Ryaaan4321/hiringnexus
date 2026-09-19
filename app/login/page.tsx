"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, ApiError } from "@/lib/api";

function LoginFormContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await api.auth.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      const destination = callbackUrl || result.redirectTo || "/user/dashboard";
      window.location.href = destination;
    } catch (err: any) {
      setIsLoading(false);
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Network error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#0a0e19] flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#dbefdb]/40 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="w-full max-w-[440px] mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/"
            className="home-arrow-link text-xs font-medium text-[#636363] hover:text-[#0a0e19] transition-colors inline-flex items-center gap-1.5"
          >
            <span className="home-arrow">←</span>
            <span>Back to Home</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] text-[11px] font-mono border border-[#b8dfb8]">
            <ShieldCheck className="w-3 h-3 text-[#397554]" />
            <span>Unified Access Portal</span>
          </span>
        </div>
        <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white shadow-xs p-5 sm:p-8 md:p-10 space-y-6">
          <div className="space-y-3 pb-5 border-b border-[#e1e1e1]">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center">
                <div className="w-4 h-6 bg-[#0a0e19] rounded-l-[1px] transform -skew-x-[12deg] mr-[2px]" />
                <div className="w-4 h-6 bg-[#397554] rounded-r-[1px] transform -skew-x-[12deg]" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-[#0a0e19]">
                HiringNexus
              </span>
            </div>
            <div>
              <h1 className="home-serif text-2xl sm:text-3xl font-normal text-[#0a0e19] tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-xs text-[#636363] mt-1">
                Enter your coordinates to access your candidate pipeline, employer portal, or workspace.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 font-mono"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="developer@example.com or founder@company.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 pr-11 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#818181] hover:text-[#0a0e19] focus:outline-none transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="home-btn home-btn-fill w-full h-11 text-sm font-medium mt-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Authenticating coordinates..." : "Sign In to Workspace"}
            </button>
          </form>

          <div className="pt-5 border-t border-[#e1e1e1] text-center text-xs text-[#636363]">
            <span>Don't have an account yet? </span>
            <Link
              href="/signup"
              className="font-medium text-[#0a0e19] underline underline-offset-4 hover:text-[#397554] transition-colors"
            >
              Create verified profile
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#818181] text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-[#397554]" />
          <span>Role-Aware Telemetry · Direct Technical Assessment</span>
        </div>
        <div className="text-center text-[11px] font-mono text-[#818181]">
          © {new Date().getFullYear()} HiringNexus · Open Protocol for Engineering Verification
        </div>
      </div>
    </div>
  );
}

export default function UnifiedLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9f9f9]" />}>
      <LoginFormContent />
    </Suspense>
  );
}
