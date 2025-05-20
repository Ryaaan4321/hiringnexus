"use client";

import { sendEmail } from "@/app/actions/sendEmail";
import { getEmailOfUsers } from "@/app/actions/user";
import { FormEvent } from "react";

async function notifyUsers(email: string, jobTitle: string, description: string) {
    console.log("notify user function got called");
    await sendEmail(email, `${jobTitle}`);
}
export default function JobForm() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data.jobTypes = [data.jobTypes]; 
        data.experience = parseInt(data.experience); 
        data.salary = parseInt(data.salary);
        try {
            const response = await fetch("/api/admin/jobpost", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                const err = await response.json();
                console.log("err = ", err);
                return;
            }
            const result = await response.json();
            console.log("response from the JobForm = ", result);
            const emailOfUsers = await getEmailOfUsers();
            console.log("email of users from the job form = ", emailOfUsers);
            for (const user of emailOfUsers) {
                await notifyUsers(user.email, result.newJob.title, "Check it out right now");
                console.log("email of the user = ",user.email);
            }
            console.log("job is posted and the user is notified about it");
        } catch (e: any) {
            console.log("err from the form", e.message);
        }
    }
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-12 p-4">
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="descreption" placeholder="Description" required />
            <input type="text" name="joblink" placeholder="Job Link (https://...)" required />
            <select name="jobTypes" required>
                <option value="">Select job type</option>
                <option value="FULLTIME">Fulltime</option>
                <option value="REMOTE">Remote</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
            </select>
            <input type="text" name="companyname" placeholder="Company Name" required />
            <input type="number" name="experience" placeholder="Experience" required />
            <input type="number" name="salary" placeholder="Salary" required />
            <div className="flex justify-center my-10">
                <button
                    type="submit"
                    className="px-6 py-3 text-xl rounded-2xl bg-slate-900 text-white cursor-pointer shadow-md"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
