"use client"
import { useEffect, useState } from "react";
import { getalljobs } from "./actions/jobsserveraction";
import { jobinterface } from "@/interfaces/jobinterface";
import Header from "../components/Header";
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

  }, [])
  return (
    <>
      <Header />
      <div>
        
      </div>
    </>
  );
}


/* color options that i have 
Neutral
Gray
Zinc
Stone
Slate
*/