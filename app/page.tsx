"use client"
import { useEffect, useState } from "react";
import jobinterface, { getalljobs } from "./lib/actions";
export default function Home() {
  const [jobs, setJobs] = useState<jobinterface[]>([]);
  const [err, seterr] = useState("")
  useEffect(() => {
    async function fetch() {
      try {
        const data = await getalljobs();
        setJobs(data);
      } catch (e: any) {
        seterr(e.message);
      }
    }
    fetch()
    console.log("type of the jobs = ", typeof (jobs))
  }, [])
  return (
    <>
      <div>
        <h1>Job Posting</h1>
        {err && <p style={{ color: "red" }}>{err}</p>}
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id}>
              <h1>{job.title}</h1>
              <p>{job.descreption}</p>
              <a href={job.joblink}>Apply here</a>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </>
  );
}
