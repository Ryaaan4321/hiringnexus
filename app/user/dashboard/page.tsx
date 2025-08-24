"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { fetchFilteredJobs, setfilters } from "@/redux/slices/jobs/filteredJobsSlice";
import { EnumJobType, jobFilters } from "@/interfaces/jobinterface";
import { SidebarTrigger } from "@/components/ui/sidebar";
import JobCards from "@/components/NewJobCard";
import { UserSidebar } from "@/components/UserSidebar";
import { useEffect } from "react";
import { selectFilteredJobs } from "@/redux/slices/jobs/jobsSelector";

export default function Page() {
    const dispatch = useAppDispatch();
    const jobs = useAppSelector(selectFilteredJobs);
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
