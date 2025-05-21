"use client";

import { useState, useEffect } from "react";
import UserBasicInfo from "./UserBasicInfo";
import UserProfileSidebar from "./UserProfileSidebar";
import { getUserRepositories, getGithubProfile } from "../app/api/github/route";
import { GitHubRepository, GitHubProfile } from "../app/api/github/route";
import { RenderGithubProfile, RenderGithubRepositories } from "./GithubProfileComponent";

export default function UserProfile() {
    const [username,setusername]=useState("");
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
    const [loading,setloading]=useState(0);

    useEffect(() => {
        setloading(1);
        async function fetchData() {
            try {
                const profileData = await getGithubProfile();
                const repoData = await getUserRepositories();
                setProfile(profileData);
                setRepositories(repoData);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("we are cooked!");
                }
            }
        }
        fetchData();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center py-4">error = {error}</div>;
    }
    if (!profile) {
        return <div className="text-gray-600 text-center py-4">Loading profile...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6">

                <div className="w-full sm:w-64 flex-none relative">
                    <UserProfileSidebar />
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <UserBasicInfo />
                        <RenderGithubProfile profile={profile} />
                    </div>
                    <div className="mt-6">
                        <RenderGithubRepositories repositories={repositories} />
                    </div>
                </div>
            </div>
        </div>
    );
}
