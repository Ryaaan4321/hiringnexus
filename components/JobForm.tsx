"use client";
import { sendEmail } from "@/app/actions/sendEmailserveraction";
import { getEmailOfUsers } from "@/app/actions/userserveraction";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Buttons } from "./ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";


async function notifyUsers(email: string, jobTitle: string, description: string) {
    await sendEmail(email, `${jobTitle}`);
}

export default function JobForm() {
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const form=event.currentTarget;
        const formData = new FormData(form);
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
                return;
            }
            const result = await response.json();
            const emailOfUsers = await getEmailOfUsers();
            for (const user of emailOfUsers) {
                await notifyUsers(user.email, result.newJob.title, "Check it out right now");
            }
            form.reset();
            router.refresh();
        } catch (e: any) {
            alert(e.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-lg mx-auto p-6 border rounded-xl shadow">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Title" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="descreption">Description</Label>
                <Input id="descreption" name="descreption" placeholder="Description" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="joblink">Job Link</Label>
                <Input id="joblink" name="joblink" placeholder="Job Link " required />
            </div>

            <div className="space-y-2">
                <Label>Job Type</Label>
                <Select name="jobTypes" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="FULLTIME">Fulltime</SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="companyname">Company Name</Label>
                <Input id="companyname" name="companyname" placeholder="Company Name" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input id="experience" name="experience" type="number" placeholder="Experience" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" name="salary" type="number" placeholder="Salary" required />
            </div>

            <div className="flex justify-center">
                <Buttons type="submit" className="text-lg px-8 py-3 rounded-2xl cursor-pointer bg-blue-900">
                    {loading ? "loading..." : "Submit"}
                </Buttons>
            </div>
        </form>
    );
}
