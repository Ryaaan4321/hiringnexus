import { Typography } from "@/components/ui/typography"
import { getSingleJob } from "@/app/actions/jobsserveraction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function testjob({ params }: { params: { id: string } }) {
    const job = await getSingleJob(params.id);
    if (!job) {
        return <div></div>
    }
    return (
        <Card className="max-w-xl mx-auto border border-gray-100 shadow-sm hover:shadow-md transition-shadow mt-4">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-gray-900">{job.title}</CardTitle>
                <div className="font-medium text-gray-500 tracking-wider">
                    <p className="font-medium ">Company Name</p>
                    <p className="text-blue-900 ">{job.companyname}</p>
                </div>
            </CardHeader>

            <CardContent className="">
                <p className="text-gray-600 leading-relaxed">{job.descreption}</p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                        <p className="font-medium text-gray-500 uppercase tracking-wider">Posted by</p>
                        <p className="font-medium text-blue-900">{job.postedby.name}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="font-medium text-gray-500 tracking-wider">Experience</p>
                        <p className="font-medium text-blue-900">{job.experience} years</p>
                    </div>

                    <div className="space-y-1">
                        <p className="font-medium text-gray-500 uppercase">Salary</p>
                        <p className="font-medium text-gray-900">₹{job.salary.toLocaleString()}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="font-medium text-gray-500 uppercase tracking-wider">Type</p>
                        <div className="flex flex-wrap gap-1">
                            {job.jobTypes.map((type, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-100 text-blue-900 font-semibold px-2 py-1 rounded-full text-xs"
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <a
                        href={job.joblink}
                        className="inline-flex items-center text-blue-900 cursor-pointer font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply Now
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}
