"use client";
import { useState, useEffect } from "react";
import { getUserRepositories, getGithubProfile } from "../api/github/route";
import { GitHubRepository, GitHubProfile } from "../api/github/route";

const getLanguageColor = (language: string | null): string => {
    const languageColors: { [key: string]: string } = {
        "JavaScript": "#f1e05a",
        "Python": "#3572A5",
        "Java": "#b07219",
        "TypeScript": "#3178C6",
        "C++": "#f34b7d",
        "Go": "#00ADD8",
        "Ruby": "#701516",
        "PHP": "#4F5D95",
        "CSS": "#563d7c",
        "HTML": "#e34f26",
        "C": "#555555",
    };
    return languageColors[language || ""] || "#000000";
};

function GithubProfileComponent() {
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
        <div>
            <h1>{profile.name}</h1>
            <img src={profile.avatar_url} alt="Profile" width="100" height="100" />
            <p>{profile.bio}</p>
            <p>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                </a>
            </p>
            <p>Followers: {profile.followers}</p>
            <p>Following: {profile.following}</p>
            <p>Public Repositories: {profile.public_repos}</p>

            <h2>Repositories</h2>
            <ul>
                {repositories.map((repo) => (
                    <li key={repo.id} style={{ marginBottom: "15px" }}>
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: "bold", textDecoration: "none" }}
                        >
                            {repo.name}
                        </a>
                        <p>{repo.description || "No description available."}</p>
                        <p>Stars: {repo.stargazers_count}</p>
                        <p>Forks: {repo.forks_count}</p>
                        <p style={{
                            // backgroundColor: getLanguageColor(repo.language),
                            padding: "5px",
                            color: getLanguageColor(repo.language),
                            borderRadius: "4px",
                            display: "inline-block"
                        }}>
                            Language: {repo.language || "Unknown"}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GithubProfileComponent;

function RenderGithubProfile({profile}:{profile:any}){
    return (
        <div>
            <h1 className="font-semibold text-sm ">{profile.name}</h1>
            <img src={profile.avatar_url} className="rounded-2xl "/>
        </div>
    )
}