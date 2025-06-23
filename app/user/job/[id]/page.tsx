// "use client"
import { Typography } from "@/components/ui/typography"
import { getSingleJob } from "@/app/actions/jobsserveraction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SingleJob from "@/components/SingleJob";

export default async function testjob({ params }: { params: { id: string } }) {
    const job = await getSingleJob(params.id);
    if (!job) {
        return <div></div>
    }
    return (
        <SingleJob job={job} />
    )
}
