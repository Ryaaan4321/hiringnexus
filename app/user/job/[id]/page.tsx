import { getSingleJob } from "@/app/actions/jobs";
export default async function JobPage({ params }: { params: { id: string } }) {
    const job = await getSingleJob(params.id);

    if (!job) {
        return <div className="text-red-500 text-center mt-10">Job not found.</div>;
    }

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-4 bg-white shadow rounded">
            <h1 className="text-3xl font-bold text-blue-800">{job.title}</h1>
            <p className="text-gray-700">{job.descreption}</p>

            <div className="text-sm text-gray-500">Posted by: <span className="font-semibold">{job.postedby.name}</span></div>

            <div className="text-sm text-gray-500">Company: <span className="font-semibold">{job.companyname}</span></div>

            <div className="text-sm text-gray-500">Experience: {job.experience} years</div>

            <div className="text-sm text-gray-500">Salary: ₹{job.salary.toLocaleString()}</div>

            <div className="text-sm text-gray-500">Job Link: <a href={job.joblink} className="text-blue-500 underline" target="_blank">Apply Here</a></div>

            <div className="mt-2">
                <h3 className="font-medium">Job Types:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                    {job.jobTypes.map((type, idx) => (
                        <span key={idx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
