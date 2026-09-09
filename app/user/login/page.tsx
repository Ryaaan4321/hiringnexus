"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.msg || "Invalid credentials. Please check your email and password.");
        setIsLoading(false);
        return;
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      window.location.href = "/user/dashboard";
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      {/* Main Login Card */}
      <div className="w-full max-w-[420px] mx-auto">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[ Back to Nexus Home ]</span>
          </Link>
        </div>
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-7 sm:p-8">
          {/* Brand header */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-neutral-950 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-mono text-xs font-semibold">
              HX
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                Sign in to HiringNexus
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                [ 001 Verified Candidate Portal ]
              </p>
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
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
                  className="w-full h-10 px-3 pr-10 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 h-10 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium tracking-tight hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hb-bracket">
                {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
              </span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500">
            <span>Don't have a verified profile? </span>
            <Link
              href="/user/signup"
              className="font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4"
            >
              Sign up here
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-mono text-neutral-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Zero-Knowledge JWT Authentication</span>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="mx-auto max-w-[1240px] w-full text-center text-xs font-mono text-neutral-400 pt-6">
        © {new Date().getFullYear()} HiringNexus Inc. · Human-Centered Engineering Signals
      </div>
    </div>
  );
}
