"use client"
import jobinterface from "../lib/actions";
export default function Card({job}:{job:jobinterface}) {
    return (
        <div className="max-w-sm rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg text-sm font-semibold">
                    HN
                </div>
                <div>
                    <div className="text-sm font-semibold text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500">{job.postedby.name}</div>
                </div>
            </div>

            <div className="border-t px-4 py-3 text-sm text-gray-700">
                Make beautiful websites regardless of your design experience.
            </div>

            <div className="border-t px-4 py-3">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline inline-flex items-center"
                >
                    Visit source code on GitHub.
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
    );
}