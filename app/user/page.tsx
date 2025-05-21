"use client"
import { useEffect, useState } from "react";
import { getalljobs } from "@/app/actions/jobs";
import jobinterface from "@/app/api/admin/jobpost/route";

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
    console.log("jobs   = ", jobs)
    return (
        <div >
            <div className="">
               
            </div>
        </div>
    );
}
