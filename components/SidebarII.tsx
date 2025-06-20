import { useState } from 'react';
import Filters from './FilterinJobs';
import { JobType } from '@/interfaces/jobinterface';
import { useUserId } from '@/hooks/user';
import UserCard from './UserCard';

export interface FilterState {
  jobTypes: JobType[];
  minExperience: number | null;
  salaryRange: [number, number] | null;
}

export default function SidebarII({
  isOpen,
  onClose,
  onApply
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}) {
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    minExperience: null,
    salaryRange: null,
  });
  const {userId}=useUserId();
  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      minExperience: null,
      salaryRange: null,
    });
  };

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-opacity-30 z-30 md:hidden" />
      )}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-sm p-6 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:block`}>
        <Filters filters={filters} onChange={setFilters} />
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => onApply(filters)}
            className="bg-blue-950 px-2 py-2 text-white rounded-md cursor-pointer"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-300 px-2 py-2 text-black rounded-md cursor-pointer"
          >
            Clear All
          </button>
        </div>
        {userId  && <UserCard userId={userId}/>}
      </div>
    </>
  );
}
