"use client"
import { useEffect, useState } from "react";
import { getalljobs } from "@/app/actions/jobsserveraction";
import jobinterface from "@/interfaces/jobinterface";
import Card from "@/components/Card"
export default function Page() {
    const [jobs, setJobs] = useState<jobinterface[]>([]);
    const [err, seterr] = useState("")
    useEffect(() => {
        async function fetchjobs() {
            try {
                const data = await getalljobs();
                setJobs(data);
            } catch (e: any) {
                seterr(e.message);
            }
        }
        fetchjobs()
        console.log("type of the jobs = ", typeof (jobs))
    }, [])
    return (
        <div >
            <div className="">
                {jobs.length > 0 ? <Card job={jobs} /> : "empty div"}
            </div>
        </div>
    );
}