"use client";

import { useState, useTransition, useEffect } from "react";
import SidebarII from "@/components/SidebarII";
import Card from "@/components/Card";
import { getFilteredJobs } from "@/app/actions/jobsserveraction";
import { EnumJobType, JobType, jobinterface, jobFilters } from "@/interfaces/jobinterface";

function useDebouncedEffect(callback: () => void, delay: number, deps: any[]) {
    useEffect(() => {
        const handler = setTimeout(() => callback(), delay);

        return () => clearTimeout(handler);
    }, [...deps, delay]);
}

export default function JobListingPage() {
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
    }, 500, [filters]);

    const handleApplyFilters = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    return (
        <div className="flex">
            <SidebarII
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onApply={handleApplyFilters}
            />
            <div className="flex-1 p-4">
                {isPending ? (
                    <p>Loading filtered jobs...</p>
                ) : (
                    <Card job={jobs} />
                )}
            </div>
        </div>
    );
}
