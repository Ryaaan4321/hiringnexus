"use client"
import { getUserRepositories, getGithubProfile, saveGithubData, getSavedGithubData } from "@/lib/github";
import { GitHubRepository, GitHubProfile, DB_Repository, DB_GitHubProfile } from "@/interfaces/githubinterface";
import { RenderGithubProfile } from "./GithubProfileComponent";
import { RenderGithubRepositories } from "./GithubProfileComponent";
import { useState, useEffect } from "react";
import { getDetailsofUser, getidOfUser } from "@/app/actions/userserveraction";
import { userDetail } from "@/interfaces/userinterface";
import UserProfileSidebar from "./UserProfileSidebar";
import UserBasicInfo from "./UserBasicInfo";
import GithubUserSearch from "./GithubUserSearch";
import { useUserDetails ,useGithub,useUserId } from "@/hooks/user";

export default function UserProfile() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<GitHubProfile | null>(null);
    const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState<userDetail | null>(null);
    const { userId, loading: useridLoading, err: useridError } = useUserId();
    const { completeUser, err } = useUserDetails();
    const {userGithubprofile,userGithubrepositories}=useGithub();
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
    console.log("user github profile = ",userGithubprofile);
    console.log("user github repositories = ",userGithubrepositories);
    useEffect(() => {
        async function fetchdata() {
            try {
                if (!userId) {
                    return;
                }
                const user = await getDetailsofUser(userId);
                if (!user) {
                    setError(useridError);
                    return;
                }
                setUserdata(user);
            } catch (e: any) {
                setError(useridError);
            }
        }
        fetchdata();
    }, [userId])
    return (
        <div className="min-h-screen bg-gray-100 p-4 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-64 flex-none relative">
                    {loading ? (
                        <div className="h-full bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                        <UserProfileSidebar user={userdata} />
                    )}
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {completeUser && <UserBasicInfo user={completeUser} />}
                        <div className={loading ? "opacity-50" : ""}>
                            <RenderGithubProfile profile={userGithubprofile} />
                        </div>
                        {userGithubrepositories.length > 0 ? "" : <div className="lg:col-span-2">
                            <GithubUserSearch onSearch={handleSearch} />
                        </div>}
                    </div>
                    <div className="mt-6">
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-20 bg-gray-200 animate-pulse rounded"></div>
                                ))}
                            </div>
                        ) : userGithubrepositories.length > 0 ? (
                            <RenderGithubRepositories repositories={userGithubrepositories} />
                        ) : profile ? (
                            <div className="border p-4 rounded bg-white">
                                <p className="text-gray-500">No repositories found</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
        </div>
    );
}
