"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserId, useUserDetails } from "@/hooks/user";
import { updateUserDetails } from "@/app/actions/userserveraction";
import { safeuserupdateinput } from "@/interfaces/userinterface";
import UploadResume from "./TestUploadResume";
import { ArrowLeft, CheckCircle2, AlertCircle, Sparkles, User, Briefcase, MapPin, DollarSign } from "lucide-react";

export default function EditUserDetails() {
  const router = useRouter();
  const { userId } = useUserId();
  const { completeUser } = useUserDetails();

  const [formdata, setFormData] = useState<Partial<safeuserupdateinput>>({
    name: "",
    username: "",
    phonenumber: "",
    profession: "",
    ctc: "",
    location: "",
    descreption: "",
    skills: [],
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    if (completeUser) {
      setFormData({
        name: completeUser.name || "",
        username: completeUser.username || "",
        phonenumber: completeUser.phonenumber || "",
        profession: completeUser.profession || "",
        ctc: completeUser.ctc || "",
        location: completeUser.location || "",
        descreption: completeUser.descreption || "",
        skills: completeUser.skills || [],
      });
      if (completeUser.skills && Array.isArray(completeUser.skills)) {
        setSkillsInput(completeUser.skills.join(", "));
      }
    }
  }, [completeUser]);

  const handleFieldChange = (field: keyof safeuserupdateinput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsChange = (raw: string) => {
    setSkillsInput(raw);
    const parsed = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setFormData((prev) => ({
      ...prev,
      skills: parsed,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) {
      setFeedback({ type: "error", msg: "Authentication required. Please log in first." });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback(null);

      const result = await updateUserDetails(userId, formdata);
      if (result && "success" in result && !result.success) {
        setFeedback({ type: "error", msg: result.msg || "Failed to update profile coordinates." });
      } else {
        setFeedback({ type: "success", msg: "Profile coordinates successfully synchronized." });
        setTimeout(() => {
          window.location.href = `/user/test-profile/${userId}`;
        }, 800);
      }
    } catch (e: any) {
      setFeedback({ type: "error", msg: e.message || "An error occurred while updating profile." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f9f9f9] text-[#0a0e19] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={userId ? `/user/test-profile/${userId}` : "/user/dashboard"}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#636363] hover:text-[#0a0e19] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Profile</span>
          </Link>
          <span className="font-mono text-xs text-[#818181] uppercase tracking-wider">
            Profile Configuration · Candidate
          </span>
        </div>

        {/* Main Configuration Card */}
        <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white shadow-xs p-6 sm:p-8">
          <div className="border-b border-[#e1e1e1] pb-6 mb-6">
            <h1 className="home-serif text-3xl font-normal tracking-tight text-[#0a0e19]">
              Edit Engineering Coordinates
            </h1>
            <p className="text-sm text-[#636363] mt-1">
              Keep your technical skills, compensation parameters, and contact coordinates up to date.
            </p>
          </div>

          {feedback && (
            <div
              role="alert"
              className={`mb-6 p-4 rounded-xl border text-xs font-mono flex items-start gap-2.5 ${
                feedback.type === "success"
                  ? "bg-[#dbefdb] border-[#b8dfb8] text-[#1e3c2c]"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#397554]" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback.msg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Primary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formdata.name || ""}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Nexus Handle / Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formdata.username || ""}
                  onChange={(e) => handleFieldChange("username", e.target.value)}
                  placeholder="e.g. alexchen_dev"
                  className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="profession"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Engineering Discipline
                </label>
                <input
                  id="profession"
                  type="text"
                  value={formdata.profession || ""}
                  onChange={(e) => handleFieldChange("profession", e.target.value)}
                  placeholder="e.g. Systems Engineer / Backend"
                  className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phonenumber"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Contact Coordinate
                </label>
                <input
                  id="phonenumber"
                  type="text"
                  value={formdata.phonenumber || ""}
                  onChange={(e) => handleFieldChange("phonenumber", e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ctc"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Target Compensation (LPA)
                </label>
                <input
                  id="ctc"
                  type="text"
                  value={formdata.ctc || ""}
                  onChange={(e) => handleFieldChange("ctc", e.target.value)}
                  placeholder="e.g. 18 LPA"
                  className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="location"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Geographic Location / Base
                </label>
                <input
                  id="location"
                  type="text"
                  value={formdata.location || ""}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                  placeholder="e.g. Bengaluru, India (Remote Preferred)"
                  className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2 pt-2 border-t border-[#e1e1e1]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="skills"
                  className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
                >
                  Core Verified Skills (Comma-Separated)
                </label>
                <span className="text-[11px] font-mono text-[#818181]">
                  {formdata.skills?.length || 0} skills indexed
                </span>
              </div>
              <input
                id="skills"
                type="text"
                value={skillsInput}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="e.g. TypeScript, Rust, Distributed Systems, PostgreSQL, Docker"
                className="w-full h-11 px-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all"
              />
              {formdata.skills && formdata.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formdata.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#dbefdb] text-[#1e3c2c] border border-[#b8dfb8]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description / Manifesto */}
            <div className="space-y-1.5 pt-2 border-t border-[#e1e1e1]">
              <label
                htmlFor="descreption"
                className="block text-xs font-mono text-[#636363] uppercase tracking-wider"
              >
                Technical Scope & Manifesto
              </label>
              <textarea
                id="descreption"
                rows={4}
                value={formdata.descreption || ""}
                onChange={(e) => handleFieldChange("descreption", e.target.value)}
                placeholder="Describe your engineering focus, high-impact projects, or architectural specializations..."
                className="w-full p-4 rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] text-sm text-[#0a0e19] placeholder:text-[#818181] focus:border-[#0a0e19] focus:bg-white focus:outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Resume Upload Module */}
            <div className="pt-2 border-t border-[#e1e1e1]">
              <span className="block text-xs font-mono text-[#636363] uppercase tracking-wider mb-2">
                Resume Artifact
              </span>
              <UploadResume />
            </div>

            {/* Submit Bar */}
            <div className="pt-6 border-t border-[#e1e1e1] flex items-center justify-between">
              <Link
                href={userId ? `/user/test-profile/${userId}` : "/user/dashboard"}
                className="text-xs font-mono text-[#636363] hover:text-[#0a0e19] transition-colors"
              >
                Discard Changes
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="home-btn home-btn-fill px-6 py-2.5 text-xs font-medium cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Synchronizing..." : "Save Profile Coordinates"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
