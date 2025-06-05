"use client"
import { userDetail } from "@/interfaces/userinterface"

export default function UserProfileSidebar({ user }: { user: userDetail | null }) {
    console.log("user from the userprofile sidebar = ",user)
    if (!user) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full min-h-[20vh] flex flex-col justify-between lg:mt-6 left-5 mt-6 sm:mt-0">
                <div className="text-center py-8">Please login or wait!</div>
            </div>
        );
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full min-h-[90vh] flex flex-col justify-between lg:mt-6 left-5 mt-6 sm:mt-0">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full text-lg font-bold mb-2">
                        {user.name ? user.name[0] : "H"}
                    </div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.profession}</p>
                </div>
                <div className="text-sm text-gray-700 text-center break-words">
                   {user.descreption}
                </div>
                <div>
                    <h1 className="font-semibold text-blue-950 mb-3">Jobs You Have Applied Recently</h1>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sky-700 text-sm">
                            <div>Frontend Developer</div>
                            <div>DE Shaw</div>
                        </div>
                        <div className="flex justify-between text-sky-700 text-sm">
                            <div>Backend Developer</div>
                            <div>Google</div>
                        </div>
                        <div className="flex justify-between text-sky-700 text-sm">
                            <div>Fullstack Developer</div>
                            <div>Amazon</div>
                        </div>
                        <div className="flex justify-between text-sky-700 text-sm">
                            <div>UI Engineer</div>
                            <div>Meta</div>
                        </div>
                        <div className="flex justify-between text-sky-700 text-sm">
                            <div>React Developer</div>
                            <div>Netflix</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm">User Interface</div>
                    <div className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm">React</div>
                    <div className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm">JavaScript</div>
                    <div className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm">TailwindCSS</div>
                    <div className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm">Next.js</div>
                    <div className="bg-gray-200 text-blue-900 px-3 py-1 rounded-full text-sm">Problem Solving</div>
                </div>
            </div>
        </div>
    )
}