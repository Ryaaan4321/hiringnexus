"use client";
import Link from "next/link";
import { jobinterface } from "@/interfaces/jobinterface";
import { useUserId } from "@/hooks/user";
import { visitedJobs } from "@/app/actions/userserveraction";
export function JobApplicationButton({ jobId, jobLink }: { jobId: string, jobLink: string }) {
    const { userId, loading, err } = useUserId();
    const handleApply = async () => {
        if (!userId) return;
        const result = await visitedJobs(jobId, userId)
    };

    return (
        <button
            onClick={handleApply}
            className="w-full bg-blue-950 text-white py-1 px-2 rounded  transition-colors cursor-pointer"
        >
            Visit Job Link
        </button>
    );
}

export function JobLinkButton({ jobLink }: { jobLink: string }) {
    return (
        <Link
            href={jobLink || "https://github.com/Ryaaan4321/hiringnexus"}
            target="_blank"
            className="w-full block text-center border border-white bg-blue-900 text-white py-1 px-1 rounded transition-colors"
        >
            Visit Job Link
        </Link>
    );
}