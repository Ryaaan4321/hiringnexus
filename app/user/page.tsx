"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { fetchFilteredJobs, setfilters } from "@/redux/slices/jobs/filteredJobsSlice";
import { EnumJobType, jobFilters } from "@/interfaces/jobinterface";
import { selectFilteredJobs } from "@/redux/slices/jobs/jobsSelector";
import { useUserDetails } from "@/hooks/user";
import { UserSidebar } from "@/components/UserSidebar";
import UserCRMTopBar from "@/components/UserCRMTopBar";
import UserDashboardMetrics from "@/components/UserDashboardMetrics";
import JobCards from "@/components/NewJobCard";
import { SlidersHorizontal } from "lucide-react";

export default function UserPortalPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const rawJobs = useAppSelector(selectFilteredJobs);
  const { completeUser, userloading, err } = useUserDetails();
  const { filters, loading, error } = useAppSelector((state) => state.filteredJobs);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchFilteredJobs(filters));
    }, 200);

    return () => clearTimeout(timer);
  }, [filters, dispatch]);

  useEffect(() => {
    if (!userloading && !completeUser && err) {
      router.push("/login");
    } else if (!userloading && completeUser) {
      const role = String((completeUser as any).role || "").toUpperCase();
      if (role === "RECRUITER") {
        router.replace("/recruiter/dashboard");
      } else if (role === "ADMIN") {
        router.replace("/admin");
      }
    }
  }, [userloading, completeUser, err, router]);

  const handleApplyFilters = (newFilters: {
    jobTypes: string[];
    minExperience: number | null;
    salaryRange: [number, number] | null;
  }) => {
    const convertedFilters: jobFilters = {
      jobTypes: newFilters.jobTypes.map((type) => EnumJobType[type as keyof typeof EnumJobType]),
      minExperience: newFilters.minExperience ?? undefined,
      salaryRange: newFilters.salaryRange || undefined,
    };
    dispatch(setfilters(convertedFilters));
  };

  const clearAllFilters = () => {
    dispatch(setfilters({}));
    setSearchQuery("");
  };

  const activeFiltersCount =
    (filters.jobTypes?.length || 0) +
    (filters.minExperience !== undefined ? 1 : 0) +
    (filters.salaryRange !== undefined ? 1 : 0);

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
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] text-[#636363] font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0a0e19] animate-pulse" />
          <span>Authenticating candidate session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-[#0a0e19]">
      <UserSidebar
        currentFilters={{
          jobTypes: (filters.jobTypes || []) as any,
          minExperience: filters.minExperience ?? null,
          salaryRange: filters.salaryRange ?? null,
        }}
        onApply={(f) => {
          handleApplyFilters(f);
          setMobileSidebarOpen(false);
        }}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full">
        <UserCRMTopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilterCount={activeFiltersCount}
          onToggleFilters={() => setMobileSidebarOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <UserDashboardMetrics
          totalJobs={rawJobs.length}
          activeFiltersCount={activeFiltersCount}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[#e1e1e1]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#636363]">
                Opportunity Pipeline · Direct Posts
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#397554]" />
            </div>
            <h2 className="home-serif text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-[#0a0e19]">
              Available Engineering Roles
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {(activeFiltersCount > 0 || searchQuery.trim()) && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-mono text-[#636363] hover:text-[#0a0e19] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
            <span className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full border border-[#cecece] bg-white text-[#636363]">
              Showing {displayedJobs.length} of {rawJobs.length} Roles
            </span>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-[11px] font-mono px-2.5 py-1 rounded-full border border-[#0a0e19] bg-[#0a0e19] text-white flex items-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filter</span>
              {activeFiltersCount > 0 && <span>({activeFiltersCount})</span>}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="home-card p-5 rounded-2xl border border-[#e1e1e1] bg-white animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e1e1e1] rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-1/3 bg-[#e1e1e1] rounded-md" />
                    <div className="h-4.5 w-2/3 bg-[#e1e1e1] rounded-md" />
                  </div>
                </div>
                <div className="h-3.5 w-full bg-[#f0f0f0] rounded-md" />
                <div className="flex gap-2 pt-2">
                  <div className="h-5 w-16 bg-[#e1e1e1] rounded-full" />
                  <div className="h-5 w-20 bg-[#e1e1e1] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-8 text-center space-y-3">
            <div className="font-mono text-xs uppercase text-red-600">
              Pipeline Query Interrupted
            </div>
            <p className="text-sm text-red-800">{error}</p>
            <button
              onClick={() => dispatch(fetchFilteredJobs(filters))}
              className="home-btn home-btn-glass text-xs font-mono text-red-700 cursor-pointer"
            >
              Retry Query
            </button>
          </div>
        ) : displayedJobs.length > 0 ? (
          <JobCards job={displayedJobs} />
        ) : (
          <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white p-12 text-center max-w-lg mx-auto space-y-4 my-8">
            <div className="font-mono text-xs text-[#818181] uppercase tracking-wider">
              Zero Matches Identified
            </div>
            <h3 className="home-serif text-2xl font-normal tracking-tight text-[#0a0e19]">
              No Positions Match Search & Filter Criteria
            </h3>
            <p className="text-sm text-[#636363] leading-relaxed">
              Try adjusting your query term, expanding required experience, or resetting salary parameters to view all active engineering postings.
            </p>
            <div className="pt-2">
              <button
                onClick={clearAllFilters}
                className="home-btn home-btn-fill text-xs"
              >
                Reset All Search & Filters
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}