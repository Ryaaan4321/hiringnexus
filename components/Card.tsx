"use client";
import Link from "next/link";
import { jobinterface } from "@/interfaces/jobinterface";
import { useUserId } from "@/hooks/user";
import { visitedJobs } from "@/app/actions/userserveraction";
import { deleteJob } from "@/app/actions/adminserveraction";
import { useAdmin } from "@/hooks/admin";
export default function Card({ job }: { job: jobinterface[] }) {
    const { userId, loading, err } = useUserId();
    const { admindata} = useAdmin();
    const role=admindata?.role;
    const canDeleteJob=admindata?.canDeleteJob;
    function AlreadyApplied({ jobId, jobLink }: { jobId: string, jobLink: string }) {
        if (!userId) {
            return null;
        }
        const handleClick = async () => {
            const result = await visitedJobs(jobId, userId)
        };
        return (
            <Link
                href={jobLink || "https://github.com/Ryaaan4321/hiringnexus"}
                target="_blank"
                onClick={handleClick}
            >
                <button className="text-blue-900 hover:underline text-sm font-medium ml-2 cursor-pointer">
                    Visit the Link
                </button>
            </Link>
        );
    }
    function DeleteThisJob({ jobId }: { jobId: string }) {
        if (!jobId) {
            return null;
        }
        const handleClick = async () => {
            const result = deleteJob(jobId);
            if ((await result).success == false) {
                <div>job is not deleted</div>
            }
            else {
                <div>succesfully delted the job</div>
            }
        }
        return (
            <button
                className="text-red-900 hover:underline text-sm font-medium mr-2 cursor-pointer"
                onClick={handleClick}
            >
                Delete the Job
            </button>
        )
    }
    return (
        <div>
            <div className="grid grid-cols-4 gap-1 card">
                {job.map((item) => (
                    <div
                        key={item.id}
                        className="max-w-sm rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
                    >
                        <Link href={`/user/job/${item.id}`}>
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
                        </Link>
                        <div className="border-t px-4 py-3 text-sm text-gray-700">
                            <div className="flex space-x-1 items-center">
                                <div className="text-zinc-800 font-semibold text-xl">Company Name :</div>
                                <div>{item.companyname}</div>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <div className="text-zinc-800 text-sm font-sm ">
                                    Posted By:
                                </div>
                                <div className="text-sm font-medium font-gray-600">{item.postedby.name}</div>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <div className="text-zinc-800 text-sm font-sm ">
                                    Experience
                                </div>
                                <div className="text-sm font-medium font-gray-600">{item.experience} year</div>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <div className="text-zinc-800 text-sm font-sm ">
                                    Salary:
                                </div>
                                <div className="text-sm text-green-600 font-medium font-gray-600">{item.salary}</div>
                            </div>
                        </div>
                        <div className="border-t px-4 py-3 text-sm text-gray-700 flex flex-wrap gap-2">
                            {item.jobTypes.map((type, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                                    onChange={() => {

                                    }}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <div>

                                {userId ? (
                                    <AlreadyApplied jobId={item.id} jobLink={item.joblink} />
                                ) : (
                                    <Link href={item.joblink || `https://github.com/Ryaaan4321/hiringnexus`} target="_blank">
                                        <button className="border-t px-2 py-1 cursor-pointer text-blue-900">
                                            Visit the Link
                                        </button>
                                    </Link>
                                )}
                            </div>
                            <div>
                               {role === "admin" && canDeleteJob && <DeleteThisJob jobId={item.id} />}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

// lets suppose user is not logged in than render the diffent component so that
// he only visits the page
