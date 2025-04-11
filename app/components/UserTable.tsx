"use client"
import userinterface from "../api/user/signup/route";


export default function UserTable({users}:{users:userinterface[]}) {
    return (
        <div className="p-4 overflow-x-auto ">
            <table className="min-w-full text-sm text-left text-white">
                <thead className=" uppercase text-xs text-black">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-blue-900 font-semibold text-2xl">Username</th>
                        <th scope="col" className="px-6 py-3  text-blue-900 font-semibold text-2xl">Email</th>
                        <th scope="col" className="px-6 py-3  text-blue-900 font-semibold text-2xl">Profession</th>
                        <th scope="col" className="px-6 py-3  text-blue-900 font-semibold text-2xl overflow-hidden">Jobs</th>
                    </tr>
                </thead>
                <tbody className="cursor-pointer">
                    {users.map((item, index) => (
                        <tr key={index} className="border-b text-black ">
                            <td className="px-6 py-4 font-medium text-2xl">{item.username}</td>
                            <td className="px-6 py-4 font-medium text-2xl text-zinc-600">{item.email}</td>
                            <td className="px-6 py-4 font-medium text-2xl text-zinc-600">{item.profession}</td>
                            <td className="px-6 py-4 font-medium text-2xl text-green-900">{2}</td>
                            {/* render the number of the jobs user has applied in the place where 2 is written */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
