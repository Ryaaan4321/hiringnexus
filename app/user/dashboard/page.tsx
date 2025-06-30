"use client"
import { useState, useTransition, useEffect } from "react"
import { UserSidebar } from "@/components/UserSidebar"
import Cards from "@/components/Cards"
import { getFilteredJobs } from "@/app/actions/jobsserveraction"
import { EnumJobType, JobType, jobinterface, jobFilters } from "@/interfaces/jobinterface";
import { SidebarTrigger } from "@/components/ui/sidebar"
function useDebouncedEffect(callback: () => void, delay: number, deps: any[]) {
    useEffect(() => {
        const handler = setTimeout(() => callback(), delay);

        return () => clearTimeout(handler);
    }, [...deps, delay]);
}
export default function Page() {
    const [filters, setFilters] = useState<{
        jobTypes: JobType[];
        minExperience: number | null;
        salaryRange: [number, number] | null;
    }>({
        jobTypes: [],
        minExperience: null,
        salaryRange: null,
    });

    const [jobs, setJobs] = useState<jobinterface[]>([]);
    const [isPending, startTransition] = useTransition();
    useDebouncedEffect(() => {
        const convertedFilters: jobFilters = {
            jobTypes: filters.jobTypes.map((type) => EnumJobType[type]),
            minExperience: filters.minExperience || undefined,
            salaryRange: filters.salaryRange || undefined,
        };

        startTransition(async () => {
            const result = await getFilteredJobs(convertedFilters);
            setJobs(result);
        });
    }, 100, [filters]);

    const handleApplyFilters = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };
    return (
        <div className="flex">
            <UserSidebar onApply={handleApplyFilters} />
            <div className="flex-1 p-4">
                <SidebarTrigger />
                {jobs.length>0 ? <Cards job={jobs} /> : <div>There are no jobs with this Filters:Please Refresh the Page</div>}
            </div>
        </div>
    )
}