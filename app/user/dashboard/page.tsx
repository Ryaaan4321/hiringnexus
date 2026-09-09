"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { fetchFilteredJobs, setfilters } from "@/redux/slices/jobs/filteredJobsSlice";
import { EnumJobType, jobFilters } from "@/interfaces/jobinterface";
import { SidebarTrigger } from "@/components/ui/sidebar";
import JobCards from "@/components/NewJobCard";
import { UserSidebar } from "@/components/UserSidebar";
import { useEffect } from "react";
import { selectFilteredJobs } from "@/redux/slices/jobs/jobsSelector";
import { useUserDetails } from "@/hooks/user";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const jobs = useAppSelector(selectFilteredJobs);
    const { completeUser, userloading, err } = useUserDetails();
    const { filters, loading, error } = useAppSelector((state) => state.filteredJobs);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchFilteredJobs(filters));
        }, 200);

        return () => clearTimeout(timer);
    }, [filters, dispatch]);

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

    useEffect(() => {
        if (!userloading && !completeUser && err) {
            router.push("/user/login");
        }
    }, [userloading, completeUser, err, router]);

    if (userloading || (!completeUser && !err)) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-neutral-500 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
                    <span>[ Verifying verified candidate credentials... ]</span>
                </div>
            </div>
        );
    }

    const clearAllFilters = () => {
        dispatch(setfilters({}));
    };

    const hasActiveFilters = Boolean(
        (filters.jobTypes && filters.jobTypes.length > 0) ||
        filters.minExperience !== undefined ||
        filters.salaryRange !== undefined
    );

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <UserSidebar onApply={handleApplyFilters} />
            <div className="flex-1 px-4 py-6 sm:px-8 max-w-7xl mx-auto w-full">
                {/* Dashboard Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                            <SidebarTrigger />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-neutral-400 tracking-wider">
                                    [ PIPELINE // VERIFIED_ROLES ]
                                </span>
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mt-0.5">
                                Direct Engineering Roles
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 transition-colors"
                            >
                                [ Reset Filters ]
                            </button>
                        )}
                        <span className="font-mono text-xs px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                            {jobs.length} {jobs.length === 1 ? "Role Active" : "Roles Active"}
                        </span>
                    </div>
                </div>

                {/* Main Content Area */}
                {loading ? (
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                                <span className="animate-spin">○</span>
                                <span>[ QUERYING_MATCHING_ENGINEERING_ROLES ]</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-900 animate-pulse space-y-4"
                                >
                                    <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                    <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                    <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-850 rounded" />
                                    <div className="flex gap-2 pt-2">
                                        <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                        <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : error ? (
                    <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 p-6 text-center space-y-2">
                        <div className="font-mono text-xs text-red-600 dark:text-red-400">
                            [ TELEMETRY_QUERY_FAILED ]
                        </div>
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                        <button
                            onClick={() => dispatch(fetchFilteredJobs(filters))}
                            className="text-xs font-mono px-3 py-1.5 rounded border border-red-300 dark:border-red-800 bg-white dark:bg-neutral-900 text-red-700 dark:text-red-300 hover:bg-red-50 transition-colors"
                        >
                            [ Retry Query ]
                        </button>
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="space-y-4">
                        <JobCards job={jobs} />
                    </div>
                ) : (
                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center max-w-lg mx-auto space-y-4 my-8">
                        <div className="font-mono text-xs text-neutral-400">
                            [ 000 ZERO_MATCHES_FOUND ]
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                            No Positions Match Current Filters
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                            Try expanding your salary range, adjusting required experience, or clearing filter criteria to see all open verified positions.
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="hb-bracket px-4 py-2 text-xs font-mono rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer"
                            >
                                <span className="bracket">[ </span>
                                <span>Reset All Filters</span>
                                <span className="bracket"> ]</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
