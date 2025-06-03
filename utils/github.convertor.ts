import { GitHubProfile,GitHubRepository,DB_GitHubProfile,DB_Repository } from "@/interfaces/githubinterface";

export function toDBProfile(profile: GitHubProfile): Omit<DB_GitHubProfile, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    username: profile.login,
    avatarUrl: profile.avatar_url,
    name: profile.name || null,
    bio: profile.bio || null,
    htmlUrl: profile.html_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following
  };
}
export function toDBRepository(repo: GitHubRepository): Omit<DB_Repository, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: repo.name,
    description: repo.description,
    htmlUrl: repo.html_url,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    language: repo.language
  };
}
export function toApiProfile(profile: DB_GitHubProfile): GitHubProfile {
  return {
    avatar_url: profile.avatarUrl,
    name: profile.name || '',
    bio: profile.bio || '',
    html_url: profile.htmlUrl,
    public_repos: profile.publicRepos,
    followers: profile.followers,
    following: profile.following,
    login: profile.username
  };
}