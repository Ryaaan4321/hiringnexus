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

    return (
        <div className="flex">
            <UserSidebar onApply={handleApplyFilters} />
            <div className="flex-1 p-4">
                <SidebarTrigger />
                {loading ? (
                    <div>Loading jobs...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : jobs.length > 0 ? (
                    <JobCards job={jobs} />
                ) : (
                    <div>No jobs match these filters. Try adjusting filters.</div>
                )}
            </div>
        </div>
    );
}
