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
    const [githubData, setGithubData] = useState<GithubProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const response = await fetch('/api/github');
                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }
                const data = await response.json();
                setGithubData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 flex-none">
                    <UserProfileSidebar />
                </div>
                <div className="flex-1 space-y-6">
                    {/* <UserBasicInfo /> */}
                    <div><GithubProfileComponent /></div>

                    {error && (
                        <div className="bg-white rounded-lg shadow-md p-6 text-red-500">
                            Error: {error}
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}