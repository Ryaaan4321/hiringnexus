export interface GitHubProfile {
    avatar_url: string;
    name: string;
    bio: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    login: string;
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
export interface DB_GitHubProfile {
    id: string;
    username: string;
    avatarUrl: string;
    name: string | null;
    bio: string | null;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface DB_Repository {
    id: string;
    name: string;
    description: string | null;
    htmlUrl: string;
    stargazersCount: number;
    forksCount: number;
    language: string | null;
    createdAt: Date;
    updatedAt: Date;
}