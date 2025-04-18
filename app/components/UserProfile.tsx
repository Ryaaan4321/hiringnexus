"use client"

import UserBasicInfo from "./UserBasicInfo"
import UserProfileSidebar from "./UserProfileSidebar"

export default function UserProfile() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 flex-none relative">
                    <UserProfileSidebar />
                </div>
                <div className="flex-2 relative">
                    <UserBasicInfo />
                </div>
            </div>
        </div>
    )
}

