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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#f9f9f9] p-6">
        <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white p-10 text-center max-w-md space-y-4">
          <span className="font-mono text-xs text-[#818181] uppercase tracking-wider">
            404 · Position Not Found
          </span>
          <h2 className="home-serif text-2xl font-normal text-[#0a0e19]">
            Position Unavailable
          </h2>
          <p className="text-sm text-[#636363] leading-relaxed">
            This role may have been filled, unlisted, or expired by the hiring manager.
          </p>
          <div className="pt-2">
            <Link
              href="/user"
              className="home-btn home-btn-fill text-xs inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Pipeline</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <SingleJob job={job} />;
}
