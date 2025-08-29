"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { useUserDetails } from "@/hooks/user";
import { saveResume } from "@/app/actions/userserveraction";

export default function ResumeUploadTest() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState<string | null>(null);
    const { completeUser } = useUserDetails();
    if(!completeUser){
        return null;
    }
    async function uploadResume(file: File, userId: string) {
        const sigRes = await fetch("/api/resume/upload", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { "Content-Type": "application/json" },
        });
        if (!sigRes.ok) {
            throw new Error("failed to get cloudinary signature");
        }
        const sigData = await sigRes.json();
        console.log("sigData = ", sigData);
        console.log("sigData cloudname = ", sigData.cloudName);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", sigData.apiKey);
        formData.append("timestamp", sigData.timestamp);
        formData.append("signature", sigData.signature);
        formData.append("public_id", sigData.publicId);
        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${sigData.cloudName}/raw/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        if (!uploadRes.ok) {
            throw new Error("cloudinary upload failedd");
        }
        console.log(uploadRes);
        const uploaded = await uploadRes.json();
        return uploaded.secure_url as string;
    }
    const handleSubmit = async () => {
        if (!file) return;
        setUploading(true);
        try {
            const resultUrl = await uploadResume(file, completeUser?.id);
            await saveResume(completeUser.id,resultUrl);
            setUrl(resultUrl);
        } catch (err: any) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };
    return (
        <Card className="p-4 border rounded-xl shadow w-[400px] mt-25 ml-20">
            <h2 className="text-lg font-semibold mb-2">Resume Upload Test</h2>
            <CardContent>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="mb-2"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!file || uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </CardContent>

            {url && (
                <div className="mt-3">
                    <p className="text-sm text-green-600">Upload successful!</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        View Resume
                    </a>
                </div>
            )}
        </Card>
    );
}
