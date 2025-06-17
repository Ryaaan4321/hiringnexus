"use client"
import { userDetail } from "@/interfaces/userinterface"
import { useRecentappliedJobs } from "@/hooks/user";
import Link from "next/link";
export default function UserProfileSidebar({ user }: { user: userDetail | null }) {
    const { jobs } = useRecentappliedJobs();
    if (!user) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full min-h-[20vh] flex flex-col justify-between lg:mt-6 left-5 mt-6 sm:mt-0">
                <div className="text-center py-8">Please login or wait!</div>
            </div>
        );
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full min-h-[90vh] flex flex-col justify-between lg:mt-6 left-5 mt-6 sm:mt-0">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full text-lg font-bold mb-2">
                        {user.name ? user.name[0] : "H"}
                    </div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.profession}</p>
                </div>
                <div className="text-sm text-gray-700 text-center break-words">
                    {user.descreption}
                </div>
                <div>
                    <h1 className="font-semibold text-blue-950 mb-3">Jobs You Have Visited Recently</h1>
                    <div className="space-y-2">
                        {jobs?.map(job => (
                            <Link
                                key={job.id}
                                href={`/user/job/${job.id}`}
                                className="flex justify-between text-sky-700 text-sm"
                            >
                                <div>{job.title}</div>
                                <div>{job.companyname}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {user.skills?.length > 0 ? (
                    user.skills.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-sm">No skills added yet.</div>
                )}
            </div>

        </div>
    )
}