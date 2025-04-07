import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiHumanTarget } from "react-icons/gi";
import { MdReport } from "react-icons/md";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-neutral-50 p-4 h-screen">
            <div className="flex items-center cursor-pointer space-x-0.5 ">
                <div className="font-semibold text-2xl text-blue-950">Create a new Job</div>
                <IoMdAddCircle size={20} className="text-slate-900 " />
            </div>
            <div className="mt-2">
                <nav className="mt-3">
                    <ul className="space-y-12">
                        <li className="font-medium  text-3xl flex  items-center space-x-1">
                            <Link href='/admin'>Jobs</Link>
                            <FaShoppingBag />
                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1">
                            <Link href='/home'>Users</Link>
                            <IoPersonSharp />
                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1">
                            <Link href='/admin'>Admin List</Link>
                            <MdAdminPanelSettings/>
                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1">
                            <Link href='/admin'>HR</Link>
                            <GiHumanTarget/>
                        </li>
                        <li className="font-medium  text-3xl flex  items-center space-x-1">
                            <Link href='/admin'>Report</Link>
                            <MdReport/>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}