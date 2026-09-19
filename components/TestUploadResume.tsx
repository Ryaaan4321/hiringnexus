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
        <div className="home-card rounded-2xl border border-[#e1e1e1] bg-white overflow-hidden mt-4 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-[#e1e1e1] pb-4">
                <div className="w-10 h-10 rounded-full bg-[#0a0e19] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="home-serif text-xl font-normal text-[#0a0e19]">Candidate Resume</h3>
                    <p className="text-xs text-[#636363]">
                        Upload your latest resume (PDF, DOC, DOCX · max {MAX_SIZE_MB} MB)
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {uploadState === "success" && message && (
                    <div className="rounded-xl border border-[#b8dfb8] bg-[#dbefdb] px-3.5 py-2.5 text-[#1e3c2c] flex items-center gap-2 text-xs font-mono">
                        <CheckCircle2 className="w-4 h-4 text-[#397554]" />
                        <span>{message}</span>
                    </div>
                )}
                {uploadState === "error" && message && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-red-800 flex items-center gap-2 text-xs font-mono">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>{message}</span>
                    </div>
                )}
                {uploadState === "invalid" && message && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-amber-800 flex items-center gap-2 text-xs font-mono">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        <span>{message}</span>
                    </div>
                )}

                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={cn(
                        "relative w-full rounded-2xl border border-dashed transition-all",
                        "p-6 text-center flex flex-col items-center justify-center",
                        uploadState === "drag" ? "border-[#0a0e19] bg-[#f5f5f5]" : "border-[#cecece] bg-[#fcfcfc]",
                        uploadState === "invalid" && "border-amber-300 bg-amber-50/40",
                        uploadState === "uploading" && "opacity-80",
                    )}
                >
                    <UploadCloud className={cn("w-9 h-9 mb-2.5", uploadState === "drag" ? "text-[#0a0e19]" : "text-[#818181]")} />
                    <p className="text-sm font-medium text-[#0a0e19]">Drag and drop your resume file here</p>
                    <p className="text-xs text-[#818181] mt-0.5">or</p>
                    <div className="mt-3">
                        <input
                            ref={inputRef}
                            id="resume-upload-input"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="sr-only"
                            onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
                        />
                        <button
                            type="button"
                            className="home-btn home-btn-glass text-xs cursor-pointer"
                            onClick={() => inputRef.current?.click()}
                            disabled={uploadState === "uploading"}
                        >
                            Browse Files
                        </button>
                    </div>
                    <p className="text-[11px] font-mono text-[#818181] mt-3">Accepted: PDF, DOC, DOCX · Max {MAX_SIZE_MB} MB</p>
                </div>

                {file && (
                    <div className="rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white border border-[#e1e1e1] flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-[#0a0e19]" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[#0a0e19]">{file.name}</div>
                                    <div className="text-xs font-mono text-[#818181]">{prettySize(file.size)}</div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="text-[#818181] hover:text-red-600 transition-colors p-1 cursor-pointer"
                                onClick={clearFile}
                                disabled={uploadState === "uploading"}
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Remove file</span>
                            </button>
                        </div>
                        {uploadState === "uploading" && (
                            <div className="mt-4">
                                <div className="h-1.5 w-full rounded-full bg-[#e1e1e1] overflow-hidden">
                                    <div
                                        className="h-1.5 rounded-full bg-[#0a0e19] transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs font-mono text-[#818181] mt-2">
                                    <span>Uploading...</span>
                                    <span>{progress}%</span>
                                </div>
                            </div>
                        )}
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleUpload}
                                disabled={uploadState === "uploading"}
                                className="home-btn home-btn-fill text-xs cursor-pointer"
                            >
                                {uploadState === "uploading" ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
                                        Upload Resume
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                className="home-btn home-btn-glass text-xs cursor-pointer"
                                onClick={() => inputRef.current?.click()}
                                disabled={uploadState === "uploading"}
                            >
                                Choose Another
                            </button>
                        </div>
                    </div>
                )}

                {uploadedUrl && (
                    <div className="rounded-xl border border-[#b8dfb8] bg-[#dbefdb]/40 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#dbefdb] text-[#1e3c2c] border border-[#b8dfb8] flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[#1e3c2c]">Resume uploaded</div>
                                    <div className="text-xs text-[#1e3c2c]/80">Your resume is indexed on your profile</div>
                                </div>
                            </div>
                            <Link
                                href={uploadedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="home-btn home-btn-glass text-xs inline-flex items-center gap-1 text-[#1e3c2c]"
                            >
                                <LinkIcon className="w-3.5 h-3.5 mr-1" />
                                View
                            </Link>
                        </div>
                    </div>
                )}

                {!userId && (
                    <div className="rounded-xl border border-[#e1e1e1] bg-[#fcfcfc] p-4 text-xs font-mono text-[#636363]">
                        Please{" "}
                        <Link href="/login" className="text-[#0a0e19] font-medium underline underline-offset-2">
                            sign in
                        </Link>{" "}
                        to upload your resume.
                    </div>
                )}
            </div>
        </div>
    );
}
