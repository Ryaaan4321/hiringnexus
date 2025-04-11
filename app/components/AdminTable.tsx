"use client"
import { adminwithjobcountinterface } from '../lib/actions'

export default function AdminTable({ admins }: { admins: adminwithjobcountinterface[] }) {
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
                    {admins.map((item, index) => (
                        <tr key={index} className="border-b text-black ">
                            <td className="px-6 py-4 font-medium text-2xl">{item.username}</td>
                            <td className="px-6 py-4 font-medium text-2xl text-zinc-600">{item.email}</td>
                            <td className="px-6 py-4 font-medium text-2xl text-zinc-600">{/* profession field here */}</td>
                            <td className="px-6 py-4 font-medium text-2xl text-green-900">{item.jobcount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}