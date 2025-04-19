// app/profile/page.tsx
"use client"
import UserBasicInfo from "./UserBasicInfo";
import UserProfileSidebar from "./UserProfileSidebar";
import { useState, useEffect } from "react";
import { getUserRepositories, getGithubProfile } from "../api/github/route";
import { GitHubRepository, GitHubProfile } from "../api/github/route";
import { FaStar, FaCodeBranch } from "react-icons/fa";
import { RenderGithubProfile, RenderGithubRepositories } from "./GithubProfileComponent";


export default function UserProfile() {
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
    const [err, setErr] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
                const profileData = await getGithubProfile();
                const repoData = await getUserRepositories();
                setProfile(profileData);
                setRepositories(repoData);
            } catch (e: any) {
                setErr(e.message);
            }
        }
        fetchData();
    }, []);

    if (err) {
        return <div>Error: {err}</div>;
    }

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 flex-none">
                    <UserProfileSidebar />
                </div>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-start md:items-center">
                        <div className="w-full">
                            <UserBasicInfo />
                        </div>
                        <div className="w-full">
                            <RenderGithubProfile profile={profile} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <RenderGithubRepositories repositories={repositories} />
                    </div>
                </div>
                {/* <div className="">
                   <RenderGithubRepositories repositories={repositories}/>
                </div> */}

            </div>
        </div>
    );
}