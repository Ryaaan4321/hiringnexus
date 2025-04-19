export interface GitHubProfile {
    avatar_url: string;
    name: string;
    bio: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
}

export interface GitHubRepository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

export async function getGithubProfile(): Promise<GitHubProfile> {
    const response = await fetch(`https://api.github.com/users/Ryaaan4321`);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
}

export async function getUserRepositories(): Promise<GitHubRepository[]> {
    const response = await fetch(`https://api.github.com/users/Ryaaan4321/repos`);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    return repos.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language
    }));
}