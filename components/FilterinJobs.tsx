import { JobType } from '@/interfaces/jobinterface';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from './ui/sidebar';
import { useUserDetails, useUserId } from '@/hooks/user';
import Link from 'next/link';
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
    function handleJobTypeChange(type: JobType) {
        onChange({
            ...filters,
            jobTypes: filters.jobTypes.includes(type)
                ? filters.jobTypes.filter(t => t !== type)
                : [...filters.jobTypes, type],
        });
    };
    function handleExperienceChange(years: number) {
        onChange({ ...filters, minExperience: years });
    };
    function handleSalaryChange(min: number | null, max: number | null) {
        onChange({
            ...filters,
            salaryRange: min !== null && max !== null ? [min, max] : null,
        });
    };
    const { user } = useUserDetails();
    const { userId, loading, err } = useUserId();
    if (!user || !userId) return null;
    return (
        <SidebarGroup>
            <Link href={`/user/profile/${userId}`}>
                <span className='text-sm font-medium text-blue-950 underline'>{`Welcome ${user.name}`}</span>
            </Link>
            <SidebarMenu>
                <div className='space-y-2'>
                    <div>
                        {/* if you fuck up in the job filter than this is the place son */}
                        <h3 className="text-base font-medium mb-2 ">Job Type</h3>
                        <div className="space-y-1 text-base">
                            {Object.values(JobType).map(type => (
                                <label key={type} className="flex items-center gap-2 text-base lowercase">
                                    <input
                                        type="checkbox"
                                        checked={filters.jobTypes.includes(type)}
                                        onChange={() => handleJobTypeChange(type)}
                                        className="form-checkbox accent-blue-600 text-base font-medium"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-base mb-2 mt-4">Experience</p>
                        <div className="space-y-1 text-base font-medium">
                            {[0, 1, 2, 3, 4].map(year => (
                                <label key={year} className="flex items-center gap-2 text-base lowercase">
                                    <input
                                        type="radio"
                                        name="experience"
                                        checked={filters.minExperience === year}
                                        onChange={() => handleExperienceChange(year)}
                                        className="form-radio accent-blue-600 text-sm"
                                    />
                                    {year} year{year !== 1 && "s"}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-base mb-2 mt-4">Salary</p>
                        <div className="grid grid-cols-1 gap-2 text-base font-medium">
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
                                        className="form-radio accent-blue-900 lowercase"
                                    />
                                    <span className="text-sm">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </SidebarMenu>
        </SidebarGroup>
    );
}
