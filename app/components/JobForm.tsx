"use client"
import { FormEvent } from "react"

export default function JobForm() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token=localStorage.getItem("access_token");
        console.log("token = ",token)
        const formdata = new FormData(event.currentTarget);
        try {
            const response = await fetch("https://localhost:3000/api/admin/jobpost", {
                method: 'POST',
                body:JSON.stringify(formdata),
                headers:{
                    Authhorization:`access_token ${token}`
                }
            });
            if (!response.ok) {
                // console.log("check the inputs");
                console.log("fromt eh reponse is not ok = ",response.json())
            }
            const result = await response.json();
            console.log(result);
        } catch (e:any) {
            console.log(e.message);
        }
    }
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-12 p-4">
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="description" placeholder="Description" required />
            <input type="url" name="joblink" placeholder="Job Link (https://...)" required />
            <select name="jobTypes" required>
                <option value="">Select job type</option>
                <option value="Fulltime">Fulltime</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
            </select>
            <input type="text" name="companyname" placeholder="Company Name" required />
            <div className="flex justify-center my-10">
                <button
                    type="submit"
                    className="px-6 py-3 text-xl rounded-2xl bg-slate-900 text-white cursor-pointer shadow-md"
                >
                Submit
                </button>
            </div>

        </form>
    )
}
