"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Buttons } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useUserId } from "@/hooks/user"
import { saveResume } from "@/app/actions/userserveraction"
import { FileText, UploadCloud, CheckCircle2, XCircle, Trash2, Loader2, LinkIcon, ShieldAlert } from "lucide-react"
import { useUserDetails } from "@/hooks/user";

type UploadState = "idle" | "drag" | "valid" | "invalid" | "uploading" | "success" | "error"

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_SIZE_MB = 5

export default function UploadResume() {
    const { userId } = useUserId()
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null)
    const [uploadState, setUploadState] = useState<UploadState>("idle")
    const [message, setMessage] = useState<string>("")
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
    const [progress, setProgress] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (uploadState === "success" || uploadState === "error") {
            const t = setTimeout(() => setMessage(""), 4000)
            return () => clearTimeout(t)
        }
    }, [uploadState])
    const validateFile = (f: File) => {
        const validType = ACCEPTED_TYPES.includes(f.type)
        const validSize = f.size <= MAX_SIZE_MB * 1024 * 1024
        if (!validType) {
            setMessage("Only PDF files are allowed.")
            setUploadState("invalid")
            return false
        }
        if (!validSize) {
            setMessage(`File too large. Max ${MAX_SIZE_MB} MB allowed.`)
            setUploadState("invalid")
            return false
        }
        return true
    }

    const onFileSelect = (f: File | null) => {
        if (!f) return
        if (!validateFile(f)) return
        setFile(f)
        setUploadState("valid")
        setMessage("")
    }

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const f = e.dataTransfer.files?.[0]
        if (f) onFileSelect(f)
    }, [])

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (uploadState !== "uploading") setUploadState("drag")
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!file) setUploadState("idle")
        else setUploadState("valid")
    }

    const clearFile = () => {
        setFile(null)
        setUploadedUrl(null)
        setProgress(0)
        setUploadState("idle")
        setMessage("")
        inputRef.current?.focus()
    }

    async function uploadToCloudinary(selected: File, uid: string) {
        const sigRes = await fetch("/api/resume/upload", {
            method: "POST",
            body: JSON.stringify({ userId: uid }),
            headers: { "Content-Type": "application/json" },
        })
        if (!sigRes.ok) throw new Error("failed to get upload signature.")

        const sigData = await sigRes.json()
        const formData = new FormData()
        formData.append("file", selected)
        formData.append("api_key", sigData.apiKey)
        formData.append("timestamp", sigData.timestamp)
        formData.append("signature", sigData.signature)
        formData.append("public_id", sigData.publicId)

        // Note: fetch does not give native upload progress. We simulate progress for UX.
        const progressTimer = setInterval(() => {
            setProgress((p) => {
                if (p >= 85) return p
                return p + 5
            })
        }, 150)

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${sigData.cloudName}/raw/upload`, {
            method: "POST",
            body: formData,
        })

        clearInterval(progressTimer)

        if (!uploadRes.ok) throw new Error("Cloudinary upload failed.")
        const uploaded = await uploadRes.json()
        return uploaded.secure_url as string
    }

    const handleUpload = async () => {
        if (!userId) {
            setUploadState("error")
            setMessage("please sign in to upload your resume.")
            return
        }
        if (!file) return

        try {
            setUploadState("uploading")
            setProgress(12)
            const url = await uploadToCloudinary(file, userId)
            setProgress(98)

            await saveResume(userId, url)
            setUploadedUrl(url)
            setProgress(100)
            setUploadState("success")
            setMessage("Resume uploaded successfully!")
        } catch (err: any) {
            console.error(err)
            setUploadState("error")
            setMessage(err?.message || "Upload failed. Please try again.")
        }
    }
    const prettySize = (bytes: number) => {
        const mb = bytes / (1024 * 1024)
        if (mb < 1) return `${(bytes / 1024).toFixed(0)} KB`
        return `${mb.toFixed(2)} MB`
    }
    return (
        <Card className="shadow-lg border-0 bg-white overflow-hidden mt-15">
            <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shadow",
                            "bg-gradient-to-br from-slate-700 to-slate-900",
                        )}
                    >
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Resume</CardTitle>
                        <CardDescription className="text-slate-600">
                            Upload your latest resume (PDF, DOC, DOCX · max {MAX_SIZE_MB} MB)
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                {uploadState === "success" && message && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-green-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                )}
                {uploadState === "error" && message && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-800 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                )}
                {uploadState === "invalid" && message && (
                    <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                )}
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={cn(
                        "relative w-full rounded-2xl border-2 border-dashed transition-colors",
                        "p-6 text-center flex flex-col items-center justify-center",
                        uploadState === "drag" ? "border-slate-700 bg-slate-50" : "border-slate-200 bg-white",
                        uploadState === "invalid" && "border-amber-300 bg-amber-50/50",
                        uploadState === "uploading" && "opacity-90",
                    )}
                >
                    <div className="pointer-events-none absolute inset-[-2px] rounded-2xl bg-gradient-to-br from-slate-100/0 via-slate-100/0 to-slate-100/0" />
                    <UploadCloud className={cn("w-10 h-10 mb-3", uploadState === "drag" ? "text-slate-800" : "text-slate-400")} />
                    <p className="text-slate-700 font-medium">Drag and drop your resume here</p>
                    <p className="text-sm text-slate-500 mt-1">or</p>
                    <div className="mt-3">
                        <input
                            ref={inputRef}
                            id="resume-upload-input"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="sr-only"
                            onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
                        />
                        <Buttons
                            type="button"
                            variant="outline"
                            className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                            onClick={() => inputRef.current?.click()}
                            disabled={uploadState === "uploading"}
                        >
                            Browse Files
                        </Buttons>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Accepted: PDF, DOC, DOCX · Max {MAX_SIZE_MB} MB</p>
                </div>
                {file && (
                    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-slate-700" />
                                </div>
                                <div>
                                    <div className="text-slate-800 font-medium">{file.name}</div>
                                    <div className="text-xs text-slate-500">{prettySize(file.size)}</div>
                                </div>
                            </div>
                            <Buttons
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-slate-500 hover:text-slate-800"
                                onClick={clearFile}
                                disabled={uploadState === "uploading"}
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Remove file</span>
                            </Buttons>
                        </div>
                        {uploadState === "uploading" && (
                            <div className="mt-4">
                                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                                    <span>Uploading...</span>
                                    <span>{progress}%</span>
                                </div>
                            </div>
                        )}
                        <div className="mt-4 flex items-center gap-2">
                            <Buttons
                                onClick={handleUpload}
                                disabled={uploadState === "uploading"}
                                className="bg-slate-800 hover:bg-slate-700"
                            >
                                {uploadState === "uploading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="w-4 h-4 mr-2" />
                                        Upload Resume
                                    </>
                                )}
                            </Buttons>
                            <Buttons
                                variant="outline"
                                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                                onClick={() => inputRef.current?.click()}
                                disabled={uploadState === "uploading"}
                            >
                                Choose Another
                            </Buttons>
                        </div>
                    </div>
                )}
                {uploadedUrl && (
                    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-md bg-green-100 text-green-700 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div className="text-sm">
                                    <div className="text-slate-800 font-medium">Resume uploaded</div>
                                    <div className="text-xs text-slate-500">Your resume is saved to your profile</div>
                                </div>
                            </div>
                            <Buttons asChild variant="ghost" size="sm" className="h-8 px-2 text-slate-600 hover:text-slate-800">
                                <Link href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    View
                                </Link>
                            </Buttons>
                        </div>
                    </div>
                )}
                {!userId && (
                    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-600">
                            Please{" "}
                            <Link href="/login" className="text-slate-800 font-medium hover:underline">
                                sign in
                            </Link>{" "}
                            to upload your resume.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
