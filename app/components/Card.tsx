"use client"
import jobinterface from "../api/admin/jobpost/route";

export default function Card({ job }: { job: jobinterface[] }) {
    return (
        <div>
            <div className="grid grid-cols-4 gap-1 card">
                {job.map((item, index) => (
                    <div
                        key={index}
                        className="max-w-sm rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
                    >
                        <div className="flex items-center gap-3 p-4">
                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg text-sm font-semibold">
                                {item.title?.[0] || "H"}
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-gray-900">
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {item.descreption}
                                </div>
                            </div>
                        </div>

                        <div className="border-t px-4 py-3 text-sm text-gray-700">
                            <div className="flex space-x-1 items-center">
                                <div className="text-zinc-800 font-semibold text-xl">Company Name :</div>
                                <div>{item.companyname}</div>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <div className="text-zinc-800 font-semibold text-xl">
                                    Posted By:
                                </div>
                                <div className="text-xl font-medium font-gray-600">{item.postedby.name}</div>
                            </div>
                        </div>
                        <div className="border-t px-4 py-3 text-sm text-gray-700 flex flex-wrap gap-2">
                            {item.jobTypes.map((type, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                                ><div> {type.name}</div>

                                </span>
                            ))}
                        </div>
                        <div className="border-t px-4 py-3">
                            <a
                                href={item.joblink || "https://github.com"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline inline-flex items-center"
                            >
                                Visit the Link
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 3h7m0 0v7m0-7L10 14"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
