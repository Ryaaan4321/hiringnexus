"use client";

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

export function RenderGithubProfile({ profile }: { profile: any }) {
    return (
        <div className="w-full p-6 bg-white shadow-lg rounded-2xl lg:mt-6 ">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
                <div>
                    <h1 className="text-xl font-bold text-gray-800">{profile.name}</h1>
                    <p className="text-sm text-gray-600">{profile.bio || "NO BIO"}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-gray-700 mb-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-blue-900">Followers</p>
                    <p className="text-lg font-semibold text-black">{profile.followers}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-blue-900">Following</p>
                    <p className="text-lg font-semibold text-black">{profile.following}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-blue-900">Public Repos</p>
                    <p className="text-lg font-semibold text-black">{profile.public_repos}</p>
                </div>
            </div>

            <div className="text-right">
                <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white bg-black rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                >
                    Stock the GIThub
                </a>
            </div>
        </div>
    );
}

export function RenderGithubRepositories({ repositories }: { repositories: any }) {
    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Repositories</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {repositories.slice(0, 6).map((repo: any) => (
                    <li
                        key={repo.id}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition"
                            >
                                {repo.name}
                            </a>
                            <p className="text-gray-600 text-sm mt-2 min-h-[50px]">
                                {repo.description || "No description provided."}
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
                            {/* <div className="flex gap-3 items-center">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" />
                                    <span>{repo.stargazers_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaCodeBranch className="text-purple-500" />
                                    <span>{repo.forks_count}</span>
                                </div>
                            </div> */}

                            <div className="flex items-center gap-2">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                                ></span>
                                <span>{repo.language || "Unknown"}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function getGithubUsername(){
   
}



