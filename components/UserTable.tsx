"use client"
import userinterface from "@/interfaces/userinterface";
import Link from "next/link";

export default function UserTable({ users }: { users: userinterface[] }) {
    return (
        
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Profession
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Jobs
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Profile
                        </th>
                    </tr>
                </thead>
                <tbody className=" bg-sidebar divide-y divide-gray-200">
                    {users.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.profession}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">-</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Link
                                    href={`/admin/users/${item.id}`}
                                    className="text-blue-900  font-medium transition-colors duration-150"
                                >
                                    View Profile
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}