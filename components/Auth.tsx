"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Auth() {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    username: "",
    specailid: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const path = usePathname();
  const router = useRouter();
  const isSignup = path.includes("/signup");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = isSignup ? "signup" : "signin";
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/${target}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        router.push("/admin/jobs");
        router.refresh();
      } else {
        setErrorMessage(data.msg || "Authentication failed. Please verify credentials.");
      }
    } catch (e: any) {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Top Bar */}
      <div className="mx-auto max-w-[1240px] w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[ Back to Nexus Home ]</span>
        </Link>
        <span className="font-mono text-xs text-neutral-400">
          [ PORTAL // RECRUITER_ADMIN ]
        </span>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-[440px] mx-auto my-auto">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm p-7 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-7 h-7 rounded-md bg-neutral-950 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-mono text-xs font-semibold">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {isSignup ? "Create Employer Account" : "Employer & Admin Sign In"}
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                [ 000 Direct Hiring Manager Console ]
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

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                    >
                      Admin Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formdata.name}
                      onChange={handleChange}
                      className="w-full h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="username"
                      className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      placeholder="jane_lead"
                      value={formdata.username}
                      onChange={handleChange}
                      className="w-full h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="phonenumber"
                    className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Contact Phone
                  </label>
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formdata.phonenumber}
                    onChange={handleChange}
                    className="w-full h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="specailid"
                    className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                  >
                    Authorization Secret (Optional)
                  </label>
                  <input
                    id="specailid"
                    name="specailid"
                    type="password"
                    placeholder="Admin invitation passcode"
                    value={formdata.specailid}
                    onChange={handleChange}
                    className="w-full h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
              >
                Employer Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="recruiter@company.com"
                value={formdata.email}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formdata.password}
                  onChange={handleChange}
                  className="w-full h-9 px-3 pr-10 rounded-md border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
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
                {isLoading ? "Authenticating..." : isSignup ? "Create Employer Account" : "Access Employer Portal"}
              </span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500">
            {isSignup ? (
              <>
                <span>Already registered as an employer? </span>
                <Link
                  href="/auth/admin/signin"
                  className="font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                <span>Looking to post engineering roles? </span>
                <Link
                  href="/auth/admin/signup"
                  className="font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4"
                >
                  Create employer account
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-mono text-neutral-400 text-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Direct Hiring Manager Pipeline · No Intermediaries</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] w-full text-center text-xs font-mono text-neutral-400 pt-6">
        © {new Date().getFullYear()} HiringNexus Inc. · Employer Operations
      </div>
    </div>
  );
}
