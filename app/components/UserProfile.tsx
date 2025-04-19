// app/profile/page.tsx
"use client"

import GithubProfileComponent from "./GithubProfileComponent";
import UserBasicInfo from "./UserBasicInfo";
import UserProfileSidebar from "./UserProfileSidebar";
import { useState, useEffect } from "react";

interface GithubProfileData {
    profile: {
        avatar_url: string;
        name: string;
        bio: string;
        html_url: string;
    };
    repositories: {
        id: number;
        name: string;
        description: string;
        html_url: string;
    }[];
}

export default function UserProfile() {
    const [error, setError] = useState<string | null>(null);
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 flex-none">
                    <UserProfileSidebar />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div><UserBasicInfo /></div>
                    <div><GithubProfileComponent /></div>
                </div>
            </div>
        </div>
    );
}