"use client";
import React from 'react';

function SidebarII({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0  bg-opacity-30 z-30 md:hidden"
                />
            )}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-white text-black border-r shadow-sm p-6 space-y-6 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:block
        `}
            >
                <h2 className="text-3xl font-bold mb-4">Filters</h2>
                <div>
                    <h3 className="font-semibold mb-2">Job Type</h3>
                    <div className="space-y-1">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox accent-blue-600" />
                            Full Time
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox accent-blue-600" />
                            Internship
                        </label>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Experience</h3>
                    <div className="space-y-1">
                        {["0", "1", "2", "3", "4"].map((year) => (
                            <label key={year} className="flex items-center gap-2">
                                <input type="radio" name="experience" className="form-radio accent-blue-600" />
                                More than {year} year{year !== "1" && "s"}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Salary</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            "Competitive",
                            "2-4 LPA",
                            "4-6 LPA",
                            "6-10 LPA",
                            "10-20 LPA",
                            "20-30 LPA",
                            "30-40 LPA",
                            "40+ LPA",
                        ].map((label) => (
                            <label key={label} className="flex items-center gap-2">
                                <input type="radio" name="salary" className="form-radio accent-blue-600" />
                                <span className="text-sm">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 pt-4 ">
                    <button
                        className="bg-blue-950 px-2 py-2 text-white rounded-md transition cursor-pointer "
                        onClick={() => onclose}>
                        Apply Filters
                    </button>
                    <button className="bg-gray-300 px-2 py-2 text-black rounded-md transition cursor-pointer">
                        Clear All
                    </button>
                </div>
                {/* <div className='flex space-x-1 items-center'>
                    <div className='text-2xl font-semibold'>Profile</div>
                    <div className='bg-blue-950 text-white rounded m-1 p-1 text-xl'>H</div>
                </div> */}
                <div className="mt-6 p-1 rounded-2xl bg-gray-100 shadow-sm flex items-center gap-4">
                    <div className="h-10 w-10 ml-1 rounded bg-blue-950 flex items-center justify-center text-white text-lg font-semibold">
                        N
                    </div>
                    <div className=''>
                        <h2 className="text-sm font-semibold text-gray-800">Frontend Devloper</h2>
                    </div>
                    <div className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 12v.01M12 18v.01" />
                        </svg>
                    </div>
               </div>
            </div>
        </>
    );
}
export default SidebarII;
