// components/UserGithubDetails.tsx
import { GetStaticProps } from "next";
import { getUserRepositories, getGithubProfile } from "../github";

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

export interface ProfileProps {
    profile: {
        avatar_url: string;
        name: string;
        bio: string;
        html_url: string;
    };
    repositories: Repository[];
}

export const getStaticProps: GetStaticProps = async () => {
    // const username = 'Ryaaan4321';
    try {
        const profile = await getGithubProfile();
        const repositories = await getUserRepositories();
        console.log("profile = ", profile)
        return {
            props: {
                profile,
                repositories,
            },
            revalidate: 86400,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default function UserGithubDetails({ profile, repositories }: ProfileProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
                <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-gray-600">{profile.bio}</p>
                    <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        View GitHub Profile
                    </a>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repositories.map(repo => (
                        <div key={repo.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold mb-2">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {repo.name}
                                </a>
                            </h3>
                            {repo.description && (
                                <p className="text-gray-600 text-sm">{repo.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}