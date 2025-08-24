import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { jobinterface } from "@/interfaces/jobinterface";

export const selectFilteredJobs = createSelector(
    (state: RootState) => state.filteredJobs.jobs,
    (jobs): jobinterface[] =>
        jobs.map(job => ({
            ...job,
            createdAt: job.createdAt ? new Date(job.createdAt) : null,
            timestamps: job.timestamps ? new Date(job.timestamps) : null,
        }))
);