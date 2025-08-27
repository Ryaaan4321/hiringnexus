"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Buttons } from "./ui/button";
import { ExternalLink } from "lucide-react";
const getLanguageColor = (language: string | null): string => {
    const languageColors: { [key: string]: string } = {
        JavaScript: "#f1e05a",
        Python: "#3572A5",
        Java: "#b07219",
        TypeScript: "#3178C6",
        "C++": "#f34b7d",
        Go: "#00ADD8",
        Ruby: "#701516",
        PHP: "#4F5D95",
        CSS: "#563d7c",
        HTML: "#e34f26",
        C: "#555555",
    }
    return languageColors[language || ""] || "#64748b"
}

export function RenderGithubProfile({ profile }: { profile: any }) {
    if (!profile) return null;
    return (
        <Card className="border-0 mb-6">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <img
                            src={profile.avatarUrl
                                || "/placeholder.svg"}
                            alt="GitHub Profile"
                            className="w-16 h-16 rounded-full border-2 "
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800">{profile.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{profile.bio || "No bio available"}</p>
                        <a
                            href={profile.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-500 hover:text-slate-700 transition-colors mt-1 inline-block"
                        >
                            @{profile.username}
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3  rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{profile.followers}</div>
                        <div className="text-xs text-slate-600">Followers</div>
                    </div>
                    <div className="text-center p-3  rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{profile.following}</div>
                        <div className="text-xs text-slate-600">Following</div>
                    </div>
                    <div className="text-center p-3  rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{profile.publicRepos
                        }</div>
                        <div className="text-xs text-slate-600">Repos</div>
                    </div>
                </div>

                <Buttons asChild size="sm" className="w-full bg-slate-800 hover:bg-slate-700 cursor-pointer">
                    <a href={profile.
                        htmlUrl
                    } target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View GitHub Profile
                    </a>
                </Buttons>
            </CardContent>
        </Card>
    )
}

export function RenderGithubRepositories({ repositories }: { repositories: any }) {
    if (!repositories || repositories.length === 0) return null

    return (
        <Card className="">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Top Repositories
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                        {repositories.length}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {repositories.slice(0, 4).map((repo: any) => (
                    <div
                        key={repo.id}
                        className="group p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <a
                                href={repo.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-slate-800 group-hover:text-slate-900 hover:underline text-sm"
                            >
                                {repo.name}
                            </a>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
                        </div>

                        <p className="text-xs text-slate-600 mb-3 line-clamp-2">{repo.description || "No description provided."}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                                <span className="text-xs text-slate-500">{repo.language || "Unknown"}</span>
                            </div>

                            {repo.stargazers_count > 0 && (
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    {repo.stargazers_count}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {repositories.length > 4 && (
                    <div className="text-center pt-2">
                        <Buttons size="sm" variant="ghost" className="text-xs text-slate-600 hover:text-slate-800">
                            View All Repositories ({repositories.length})
                        </Buttons>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}



