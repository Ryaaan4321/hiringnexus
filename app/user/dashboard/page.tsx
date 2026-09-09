"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { fetchFilteredJobs, setfilters } from "@/redux/slices/jobs/filteredJobsSlice";
import { EnumJobType, jobFilters, jobinterface } from "@/interfaces/jobinterface";
import { selectFilteredJobs } from "@/redux/slices/jobs/jobsSelector";
import { useUserDetails } from "@/hooks/user";
import { UserSidebar } from "@/components/UserSidebar";
import UserCRMTopBar from "@/components/UserCRMTopBar";
import UserDashboardMetrics from "@/components/UserDashboardMetrics";
import JobCards from "@/components/NewJobCard";
import { SlidersHorizontal, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const rawJobs = useAppSelector(selectFilteredJobs);
  const { completeUser, userloading, err } = useUserDetails();
  const { filters, loading, error } = useAppSelector((state) => state.filteredJobs);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Debounced Redux filter fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchFilteredJobs(filters));
    }, 200);

    return () => clearTimeout(timer);
  }, [filters, dispatch]);

  // Auth check
  useEffect(() => {
    if (!userloading && !completeUser && err) {
      router.push("/user/login");
    }
  }, [userloading, completeUser, err, router]);

  const handleApplyFilters = (newFilters: {
    jobTypes: string[];
    minExperience: number | null;
    salaryRange: [number, number] | null;
  }) => {
    const convertedFilters: jobFilters = {
      jobTypes: newFilters.jobTypes.map((type) => EnumJobType[type as keyof typeof EnumJobType]),
      minExperience: newFilters.minExperience || undefined,
      salaryRange: newFilters.salaryRange || undefined,
    };
    dispatch(setfilters(convertedFilters));
  };

  const clearAllFilters = () => {
    dispatch(setfilters({}));
    setSearchQuery("");
  };

  // Active filter rules count
  const activeFiltersCount =
    (filters.jobTypes?.length || 0) +
    (filters.minExperience !== undefined ? 1 : 0) +
    (filters.salaryRange !== undefined ? 1 : 0);

  // Client-side search and sorting filter
  const displayedJobs = useMemo(() => {
    let result = [...rawJobs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.companyname?.toLowerCase().includes(q) ||
          job.descreption?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          job.jobTypes?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === "salary_desc") {
      result.sort((a, b) => (b.salary || 0) - (a.salary || 0));
    } else if (sortBy === "exp_asc") {
      result.sort((a, b) => (a.experience || 0) - (b.experience || 0));
    }

    return result;
  }, [rawJobs, searchQuery, sortBy]);

  if (userloading || (!completeUser && !err)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950 text-neutral-500 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
          <span>[ Authenticating candidate session... ]</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* CRM Sidebar Navigation */}
      <UserSidebar onApply={handleApplyFilters} />

      {/* Main CRM Content Area */}
      <main className="flex-1 min-w-0 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Integrated Top CRM Control Bar */}
        <UserCRMTopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilterCount={activeFiltersCount}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* CRM Overview Metrics Bar (Inspired by User Screenshot) */}
        <UserDashboardMetrics
          totalJobs={rawJobs.length}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Board Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                [ OPPORTUNITY_PIPELINE // DIRECT_POSTS ]
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white mt-0.5">
              Available Engineering Roles
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {(activeFiltersCount > 0 || searchQuery.trim()) && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                [ Reset All Filters ]
              </button>
            )}
            <span className="text-xs font-mono px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
              Showing {displayedJobs.length} of {rawJobs.length} Roles
            </span>
          </div>
        </div>

        {/* Roles Pipeline Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-900 animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
                    <div className="h-4.5 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  </div>
                </div>
                <div className="h-3.5 w-full bg-neutral-100 dark:bg-neutral-850 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 p-8 text-center space-y-3">
            <div className="font-mono text-xs text-red-600 dark:text-red-400">
              [ PIPELINE_QUERY_FAILED ]
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => dispatch(fetchFilteredJobs(filters))}
              className="px-3 py-1.5 rounded-md border border-red-300 dark:border-red-800 bg-white dark:bg-neutral-900 text-xs font-mono text-red-700 dark:text-red-300 hover:bg-red-50 transition-colors cursor-pointer"
            >
              [ Retry Query ]
            </button>
          </div>
        ) : displayedJobs.length > 0 ? (
          <JobCards job={displayedJobs} />
        ) : (
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center max-w-lg mx-auto space-y-4 my-8 shadow-xs">
            <div className="font-mono text-xs text-neutral-400">
              [ ZERO_MATCHES_IDENTIFIED ]
            </div>
            <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              No Positions Match Search & Filter Criteria
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              Try adjusting your query term, expanding required experience, or resetting salary parameters to view all active engineering postings.
            </p>
            <button
              onClick={clearAllFilters}
              className="hb-bracket px-4 py-2 text-xs font-mono rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer"
            >
              <span className="bracket">[ </span>
              <span>Reset All Search & Filters</span>
              <span className="bracket"> ]</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
