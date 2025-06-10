import { GitHubProfile, GitHubRepository } from "@/interfaces/githubinterface";
import { NextResponse } from "next/server";
const API_BASE = "/api/github";
export async function saveGithubData(
    userId: string,
    profile: GitHubProfile,
    repositories: GitHubRepository[]
) {
    const token = localStorage.getItem("token");
    if(!token){
        return NextResponse.json("please login first from the save github data")
    }
    const res = await fetch(`${API_BASE}/save`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization":`access_token ${token}` 
        },
        body: JSON.stringify({ userId, profile, repositories }),
    });
    if (!res.ok) throw new Error("sorry please try again!");
    return res.json();
}
export async function getSavedGithubData(userId: string) {
    const res = await fetch(`${API_BASE}/load/?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.err || "sorry try again!");
    }
    return res.json() as Promise<{ profile: GitHubProfile; repositories: GitHubRepository[] }>;
}
export async function getGithubProfile(username: string): Promise<GitHubProfile> {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error(`Error from GitHub API: ${response.status}`);
    }
    return response.json();
}
export async function getUserRepositories(username: string): Promise<GitHubRepository[]> {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
        throw new Error(`Error from GitHub API: ${response.status}`);
    }
    const repos = await response.json();
    console.log("reposs = ",repos);
    return repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
    }));
}
