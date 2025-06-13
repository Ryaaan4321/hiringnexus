import { JobType } from '@/interfaces/jobinterface';

export default function Filters({
    filters,
    onChange,
}: {
    filters: {
        jobTypes: JobType[];
        minExperience: number | null;
        salaryRange: [number, number] | null;
    };
    onChange: (newFilters: {
        jobTypes: JobType[];
        minExperience: number | null;
        salaryRange: [number, number] | null;
    }) => void;
}) {
    const handleJobTypeChange = (type: JobType) => {
        onChange({
            ...filters,
            jobTypes: filters.jobTypes.includes(type)
                ? filters.jobTypes.filter(t => t !== type)
                : [...filters.jobTypes, type],
        });
    };

    const handleExperienceChange = (years: number) => {
        onChange({ ...filters, minExperience: years });
    };

    const handleSalaryChange = (min: number | null, max: number | null) => {
        onChange({
            ...filters,
            salaryRange: min !== null && max !== null ? [min, max] : null,
        });
    };

    return (
        <div>
            {/* Job Type Filter */}
            <div>
                <h3 className="font-semibold mb-2">Job Type</h3>
                <div className="space-y-1">
                    {Object.values(JobType).map(type => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.jobTypes.includes(type)}
                                onChange={() => handleJobTypeChange(type)}
                                className="form-checkbox accent-blue-600"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* Experience Filter */}
            <div>
                <h3 className="font-semibold mb-2 mt-4">Experience</h3>
                <div className="space-y-1">
                    {[0, 1, 2, 3, 4].map(year => (
                        <label key={year} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="experience"
                                checked={filters.minExperience === year}
                                onChange={() => handleExperienceChange(year)}
                                className="form-radio accent-blue-600"
                            />
                            More than {year} year{year !== 1 && "s"}
                        </label>
                    ))}
                </div>
            </div>

            {/* Salary Filter */}
            <div>
                <h3 className="font-semibold mb-2 mt-4">Salary</h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "Competitive", value: null },
                        { label: "2-4 LPA", value: [2, 4] },
                        { label: "4-6 LPA", value: [4, 6] },
                        { label: "7-12 LPA", value: [7, 12] },
                        { label: "12-30 LPA", value: [12, 30] },
                        { label: "30-90 LPA", value: [30, 90] },
                    ].map(({ label, value }) => (
                        <label key={label} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="salary"
                                checked={JSON.stringify(filters.salaryRange) === JSON.stringify(value)}
                                onChange={() =>
                                    handleSalaryChange(value?.[0] ?? null, value?.[1] ?? null)
                                }
                                className="form-radio accent-blue-600"
                            />
                            <span className="text-sm">{label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
