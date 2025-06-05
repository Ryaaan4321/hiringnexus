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
        </div>
    )
}