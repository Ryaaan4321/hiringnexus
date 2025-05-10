import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { TbBriefcase2 } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { RiUserCommunityLine } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white p-4 h-screen hidesidebar sticky top-8 left-0 border-l-4">
            <div className="flex items-center cursor-pointer space-x-0.5 ">
                <Link href='/admin/createjob'>
                    <div className="font-semibold text-2xl text-blue-950">Create a new Job</div>
                </Link>
                <IoMdAddCircle size={20} className="text-slate-900 " />
            </div>
            <div className="mt-2">
                <nav className="mt-3">
                    <ul className="space-y-12">

                        <li className="font-medium  text-3xl flex  items-center space-x-1 sidebar-item">
                            <TbBriefcase2 />
                            <Link href='/admin/jobs'>Jobs</Link>

                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1 sidebar-item">
                            <LuUsers />
                            <Link href='/admin/users'>Users</Link>
                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1 sidebar-item">
                            <RiAdminLine />
                            <Link href='/admin/adminlist'>Admin List</Link>
                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1 sidebar-item">
                            <RiUserCommunityLine />
                            <Link href='/admin/hr'>HR</Link>

                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1">
                            <MdOutlineReport />
                            <Link href='/admin/report'>Report</Link>

                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}