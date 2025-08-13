"use client"

import { sendEmail } from "@/app/actions/sendEmailserveraction"
import { type FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Buttons } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Briefcase, Building2, DollarSign, Clock, LinkIcon, FileText, Send, Loader2 } from "lucide-react"
import { getEmailOfUsers } from "@/app/actions/userserveraction";

async function notifyUsers(email: string, jobTitle: string, description: string) {
    try {
        await sendEmail(email, `New Job Posted: ${jobTitle}`)
    } catch (error) {
        console.error("Failed to send email to:", email, error)
    }
}

export default function ElegantJobForm() {
    const [loading, setLoading] = useState(false)
    const [selectedJobType, setSelectedJobType] = useState("")
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const router = useRouter()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setSubmitStatus("idle")

        const form = event.currentTarget
        const formData = new FormData(form)
        const data: any = {}

        formData.forEach((value, key) => {
            data[key] = value
        })

        data.jobTypes = [data.jobTypes]
        data.experience = Number.parseInt(data.experience)
        data.salary = Number.parseInt(data.salary)

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
            if (!response.ok) {
                throw new Error("Failed to post job")
            }
            const result = await response.json()
            try {
                const emailOfUsers = await getEmailOfUsers()
                const notificationPromises = emailOfUsers.map((user) =>
                    notifyUsers(user.email, result.newJob.title, "Check it out right now"),
                )
                await Promise.allSettled(notificationPromises)
            } catch (emailError) {
                console.warn("Failed to send some notifications:", emailError)
            }
            form.reset()
            setSelectedJobType("")
            setSubmitStatus("success")
            setTimeout(() => setSubmitStatus("idle"), 3000)
            router.refresh()
        } catch (e: any) {
            console.error("Error posting job:", e.message)
            setSubmitStatus("error")
            setTimeout(() => setSubmitStatus("idle"), 5000)
        } finally {
            setLoading(false)
        }
    }
    const jobTypeOptions = [
        { value: "FULLTIME", label: "Full Time" },
        { value: "REMOTE", label: "Remote" },
        { value: "INTERNSHIP", label: "Internship" },
        { value: "CONTRACT", label: "Contract" },
    ]
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="shadow-xl border-0 bg-white">
                    <CardHeader className="text-center pb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold text-slate-800">Post New Job</CardTitle>
                        <CardDescription className="text-lg text-slate-600 mt-2">
                            Create a new job posting and notify all registered users
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        {submitStatus === "success" && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 text-green-800">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="font-medium">Job posted successfully! Users have been notified.</span>
                                </div>
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center gap-2 text-red-800">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="font-medium">Failed to post job. Please try again.</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="title" className="text-base font-semibold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Job Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g. Senior Frontend Developer"
                                    required
                                    className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="descreption" className="text-base font-semibold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Job Description
                                </Label>
                                <Textarea
                                    id="descreption"
                                    name="descreption"
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                    required
                                    rows={4}
                                    className="text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500 transition-colors resize-none"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="joblink" className="text-base font-semibold text-slate-700 flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4" />
                                    Application Link
                                </Label>
                                <Input
                                    id="joblink"
                                    name="joblink"
                                    type="url"
                                    placeholder="https://company.com/careers/job-id"
                                    required
                                    className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="companyname"
                                        className="text-base font-semibold text-slate-700 flex items-center gap-2"
                                    >
                                        <Building2 className="w-4 h-4" />
                                        Company
                                    </Label>
                                    <Input
                                        id="companyname"
                                        name="companyname"
                                        placeholder="e.g. TechCorp Solutions"
                                        required
                                        className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold text-slate-700 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Job Type
                                    </Label>
                                    <Select name="jobTypes" required value={selectedJobType} onValueChange={setSelectedJobType}>
                                        <SelectTrigger className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jobTypeOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value} className="text-base py-3">
                                                    <div className="flex items-center gap-2">
                                                        <span>{option.label}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="experience"
                                        className="text-base font-semibold text-slate-700 flex items-center gap-2"
                                    >
                                        <Clock className="w-4 h-4" />
                                        Experience (Years)
                                    </Label>
                                    <Input
                                        id="experience"
                                        name="experience"
                                        type="number"
                                        min="0"
                                        max="20"
                                        placeholder="e.g. 2"
                                        required
                                        className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="salary" className="text-base font-semibold text-slate-700 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Salary (LPA)
                                    </Label>
                                    <Input
                                        id="salary"
                                        name="salary"
                                        type="number"
                                        min="0"
                                        placeholder="e.g. 12"
                                        required
                                        className="h-12 text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="pt-6">
                                <Buttons
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 text-lg font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Posting Job...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Post Job & Notify Users
                                        </>
                                    )}
                                </Buttons>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Once posted, all registered users will be automatically notified via email about this new opportunity.
                    </p>
                </div>
            </div>
        </div>
    )
}
