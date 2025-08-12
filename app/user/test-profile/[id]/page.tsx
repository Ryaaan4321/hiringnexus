"use client"

import { useState } from "react"
import { Buttons } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, } from "lucide-react"
import { useUserDetails } from "@/hooks/user"
import { getUserRepositories, getGithubProfile, saveGithubData, getSavedGithubData } from "@/lib/github";
import { GitHubRepository, GitHubProfile, DB_Repository, DB_GitHubProfile } from "@/interfaces/githubinterface";
import { RenderGithubProfile } from "@/components/GithubProfileComponent"
import { RenderGithubRepositories } from "@/components/GithubProfileComponent"
import { useEffect } from "react";
import { getDetailsofUser, getidOfUser } from "@/app/actions/userserveraction";
import { userDetail } from "@/interfaces/userinterface";
import UserProfileSidebar from "@/components/UserProfileSidebar"
import GithubUserSearch from "@/components/GithubUserSearch"
import { useGithub, useUserId } from "@/hooks/user";



export default function ProfilePreview() {
    const { completeUser } = useUserDetails();
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState<userDetail | null>(null);
    const { userId, loading: useridLoading, err: useridError } = useUserId();
    const { userGithubprofile, userGithubrepositories } = useGithub();

    if (!completeUser) {
        return (
            <Card className="w-full max-w-sm shadow-lg border-0">
                <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-slate-500 font-medium">Please login or wait!</p>
                    </div>
                </CardContent>
            </Card>
        )
    }
    const handleSearch = async (searchUsername: string) => {
        try {
            setLoading(true);
            setError(null);
            setUsername(searchUsername);
            const profileData = await getGithubProfile(searchUsername);
            const repoData = await getUserRepositories(searchUsername);
            if (!userId) {
                throw new Error("please login first!");
            }
            await saveGithubData(userId, profileData, repoData);
            setProfile(profileData);
            setRepositories(repoData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
            setProfile(null);
            setRepositories([]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen ">
            <div className=" border-gray-200 p-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4"></h1>
                </div>
            </div>
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <UserProfileSidebar user={completeUser} />
                    </div>
                    {userGithubrepositories.length > 0 ? <div className="lg:col-span-2">
                        <div className="rounded-lg  p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Github Profile</h2>
                            <RenderGithubProfile profile={userGithubprofile} />

                            <div className="space-y-4">
                                {loading ? (
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="h-20  animate-pulse rounded"></div>
                                        ))}
                                    </div>
                                ) : userGithubrepositories.length > 0 ? (
                                    <RenderGithubRepositories repositories={userGithubrepositories} />
                                ) : profile ? (
                                    <div className="border p-4 rounded b">
                                        <p className="text-gray-500">No repositories found</p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div> : <GithubUserSearch onSearch={handleSearch} />}
                </div>
            </div>
        </div>
    )
}
