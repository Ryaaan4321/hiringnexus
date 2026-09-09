import { Typography } from "@/components/ui/typography"
import { getSingleJob } from "@/app/actions/jobsserveraction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SingleJob from "@/components/SingleJob";

export default async function testjob({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = await getSingleJob(id);
    if (!job) {
        return <div></div>
    }
    return (
        <SingleJob job={job} />
    )
}
