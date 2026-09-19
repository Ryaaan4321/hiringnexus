"use client";

import React, { useState } from "react";

interface NexusWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NexusWaitlistModal({ isOpen, onClose }: NexusWaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      
      <div
        className="fixed inset-0 bg-[#0a0e19]/35 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />

      
      <div className="waitlist-dialog relative z-10 w-full max-w-[26rem] rounded-xl border-[0.5px] border-[#cecece] bg-white p-6 shadow-2xl md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-xl text-[#818181] hover:bg-[#f2f2f2] hover:text-[#0a0e19] transition-colors"
        >
          ×
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <h2 className="text-xl font-medium text-[#0a0e19]">You’re on the waitlist!</h2>
            <p className="mt-2 text-sm text-[#636363]">
              We’ll send an invite to <span className="font-semibold text-[#0a0e19]">{email}</span> when your spot opens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2 id="waitlist-dialog-title" className="pr-8 text-2xl font-medium text-[#0a0e19]">
              Join the waitlist
            </h2>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#636363]">
              We onboard teams in waves. Leave your work email and we&apos;ll send your invite when your spot opens.
            </p>
            <label htmlFor="waitlist-email" className="sr-only">
              Work email
            </label>
            <input
              id="waitlist-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-5 w-full rounded-md border-[0.5px] border-[#cecece] bg-white px-3 py-2 text-base text-[#0a0e19] placeholder:text-[#818181] focus:outline-2 focus:outline-[#0a0e19]"
            />
            <button
              type="submit"
              disabled={!email}
              className="mt-4 w-full cursor-pointer rounded-lg border border-[#0a0e19] bg-[#0a0e19] px-3 py-2 text-base text-white transition-colors hover:bg-[#1a2030] disabled:cursor-default disabled:opacity-60"
            >
              Join the waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
