import { getSingleJob } from "@/app/actions/jobsserveraction";
import SingleJob from "@/components/SingleJob";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getSingleJob(id);

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950 p-6">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center max-w-md space-y-4">
          <span className="font-mono text-xs text-neutral-400">
            [ 404 // ROLE_NOT_FOUND ]
          </span>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Position Unavailable
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            This role may have been filled, unlisted, or expired by the hiring manager.
          </p>
          <Link
            href="/user/dashboard"
            className="hb-bracket inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <span className="bracket">[ </span>
            <span>Return to Live Pipeline</span>
            <span className="bracket"> ]</span>
          </Link>
        </div>
      </div>
    );
  }

  return <SingleJob job={job} />;
}
