"use client";
import Link from "next/link";
import { jobinterface } from "@/interfaces/jobinterface";
import { useUserId } from "@/hooks/user";
import { visitedJobs } from "@/app/actions/userserveraction";
import { deleteJob } from "@/app/actions/adminserveraction";
import { useAdmin } from "@/hooks/admin";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Cards({ job }: { job: jobinterface[] }) {
    const { userId, loading, err } = useUserId();
    const { admindata } = useAdmin();
    const role = admindata?.role;
    const canDeleteJob = admindata?.canDeleteJob;
    console.log("candelete job from the card = ", canDeleteJob)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {job.map((item) => (
                <Card key={item.id} className="max-w-sm mb-4 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <Link href={`/user/job/${item.id}`} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg text-sm font-semibold">
                                {item.title?.[0] || "H"}
                            </div>
                            <div>
                                <CardTitle className="text-sm font-semibold text-gray-900">
                                    {item.title}
                                </CardTitle>
                                <CardDescription className="text-xs text-gray-500">
                                    {item.descreption}
                                </CardDescription>
                            </div>
                        </Link>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm text-gray-700">
                        <div className="flex space-x-1 items-center">
                            <span className="text-zinc-800 font-semibold text-base">Company Name:</span>
                            <span>{item.companyname}</span>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <span className="text-zinc-800 text-sm">Posted By:</span>
                            <span className="text-sm font-medium text-gray-600">{item.postedby.name}</span>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <span className="text-zinc-800 text-sm">Experience:</span>
                            <span className="text-sm font-medium text-gray-600">{item.experience} year</span>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <span className="text-zinc-800 text-sm">Salary:</span>
                            <span className="text-sm text-green-600 font-medium">{item.salary}</span>
                        </div>
                    </CardContent>

                    <CardContent className="flex flex-wrap gap-2 border-t pt-2 top-1 items-center">
                        {item.jobTypes.map((type, i) => (
                            <span
                                key={i}
                                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                                {type}
                            </span>
                        ))}
                    </CardContent>

                    <CardFooter className="flex justify-between border-t pt-1">
                        <div className="items-center">
                            {userId ? (
                                <AlreadyApplied jobId={item.id} jobLink={item.joblink} />
                            ) : (
                                <Link
                                    href={item.joblink || `https://github.com/Ryaaan4321/hiringnexus`}
                                    target="_blank"
                                >
                                    <button className="px-1 py-1 cursor-pointer text-blue-900 hover:underline text-sm font-medium">
                                        Visit the Link
                                    </button>
                                </Link>
                            )}
                        </div>
                        <div>
                            {role === "admin" && canDeleteJob && <DeleteThisJob jobId={item.id} />}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

// lets suppose user is not logged in than render the diffent component so that
// he only visits the page
