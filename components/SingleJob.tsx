"use client"
import { getSingleJob } from "@/app/actions/jobsserveraction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserId } from "@/hooks/user";
import { jobinterface } from "@/interfaces/jobinterface";
import { visitedJobs } from "@/app/actions/userserveraction";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SingleJob({ job }: { job: jobinterface }) {
    const { userId, loading, err } = useUserId()
    const [isclient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, [])
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
    return (
        <div className="space-y-6 mt-20">
            <Card
                key={job.id}
                className="max-w-xl mx-auto border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold text-gray-900">{job.title}</CardTitle>
                    <div className="font-medium text-gray-500 tracking-wider">
                        <p className="font-medium">Company Name</p>
                        <p className="text-blue-900">{job.companyname}</p>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="text-gray-600 leading-relaxed">{job.descreption}</p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                            <p className="font-medium text-gray-500 uppercase tracking-wider">Posted by</p>
                            <p className="font-medium text-blue-900">{job.postedby.name}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-gray-500 tracking-wider">Experience</p>
                            <p className="font-medium text-blue-900">
                                {job.experience === 0 ? "Fresher" : `${job.experience} year${job.experience > 1 ? "s" : ""}`}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-gray-500 uppercase">Salary</p>
                            <div className="font-medium text-gray-900">₹{job.salary}</div>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-gray-500 uppercase tracking-wider">Type</p>
                            <div className="flex flex-wrap gap-1">
                                {job.jobTypes.map((type: any, idx: any) => (
                                    <span key={idx} className="bg-gray-100 text-blue-900 font-semibold px-2 py-1 rounded-full text-xs">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}