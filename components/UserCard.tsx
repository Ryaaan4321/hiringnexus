"use client"

import { getDetailsofUser } from "@/app/actions/userserveraction";
import Link from "next/link"
import { useEffect, useState } from "react";
import { userDetail } from "@/interfaces/userinterface";

export default function UserCard({ userId }: { userId: string }) {
    const [userdata, setUserdata] = useState<userDetail | null>(null);
    useEffect(() => {
        async function fetchdata() {
            const user = await getDetailsofUser(userId);
            setUserdata(user);
        }
        fetchdata();
    },[])
    return (
        <Link href={`/user/test-profile/${userId}`}>
            <div
                className="mt-6 p-1 rounded-2xl bg-gray-100 shadow-sm flex items-center gap-4 group hover:bg-blue-100 transition-colors duration-200 cursor-pointer relative"
            >
                <div className="h-8 w-8 ml-1 rounded-xl bg-blue-950 flex items-center justify-center text-white text-lg font-semibold">
                    {userdata?.username[0]}
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                       {userdata?.profession}
                    </h2>
                </div>
                <span className="absolute top-[-25px] left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Profile
                </span>
            </div>
        </Link>
    );
}