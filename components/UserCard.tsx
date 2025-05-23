"use client"

import Link from "next/link"

export default function UserCard({ userId }: { userId: string }) {
    return (
        <Link href={`/user/${userId}`}>
            <div
                className="mt-6 p-1 rounded-2xl bg-gray-100 shadow-sm flex items-center gap-4 group hover:bg-blue-100 transition-colors duration-200 cursor-pointer relative"
                title="Click to view profile"
            >
                <div className="h-8 w-8 ml-1 rounded-xl bg-blue-950 flex items-center justify-center text-white text-lg font-semibold">
                    N
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                        Frontend Developer
                    </h2>
                </div>
                <span className="absolute top-[-25px] left-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Profile
                </span>
            </div>
        </Link>
    );
}