"use client"
import { useEffect, useState } from "react";
import jobinterface, { getalljobs } from "@/app/lib/actions";
import Card from "@/app/components/Card"
export default function Page() {
    const [jobs, setJobs] = useState<jobinterface[]>([]);
    const [err, seterr] = useState("")
    useEffect(() => {
        async function fetch() {
            try {
                const data = await getalljobs();
                console.log("data = ", data)
                setJobs(data);
            } catch (e: any) {
                seterr(e.message);
            }
        }
        fetch()
        console.log("type of the jobs = ", typeof (jobs))
    }, [])
    console.log("jobs   = ", jobs)
    return (
        <div >
            <div className="">
                {jobs.length > 0 ? <Card job={jobs} /> : "empty div"}
            </div>
        </div>
    );
}
