// components/user/UserSidebar.tsx
"use client";

import Filters from "./FilterinJobs";
import { useState } from "react";
import { JobType } from "@/interfaces/jobinterface";

export function UserSidebar() {
  const [filters, setFilters] = useState<{
    jobTypes: JobType[];
    minExperience: number | null;
    salaryRange: [number, number] | null;
  }>({
    jobTypes: [],
    minExperience: null,
    salaryRange: null,
  });

  return <Filters filters={filters} onChange={setFilters} />;
}
