"use client"
import { useUserFromParam } from "@/hooks/user";

export default function AdminUserProfilePage() {
    const { user, err } = useUserFromParam();
    if (!user) {
        return <div>User not found!</div>
    }
    if (err) {
        return <div>{err}</div>
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{user.username}'s Profile</h1>
            <p>Email: {user.email}</p>
            <p>Profession: {user.profession}</p>
            <p>name :{user.name}</p>
            <p>descreption :{user.descreption}</p>
            <p>phonenumbr : {user.phonenumber}</p>
            <p>profession : {user.profession}</p>
            <p>githubprofile :{user.githubprofile?.username}</p>
            <p>{user.githubprofile?.htmlUrl}</p>
            {user?.githubprofile?.repositories.map((repo) => (
                <div key={repo.id} className="border p-4 my-2 rounded">
                    <h3 className="font-bold">{repo.name}</h3>
                    <p>
                         {repo.stargazersCount} | {" "}
                        <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            View Repo
                        </a>
                    </p>
                </div>
            ))}
        </div>
    )
}