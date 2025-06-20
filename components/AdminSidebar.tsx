"use client";

import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { TbBriefcase2 } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { RiAdminLine, RiUserCommunityLine } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AdminSidebar() {
  return (
    <Sidebar className="sticky top-8 h-screen w-64 border-r bg-white">
      <SidebarContent>
        <SidebarMenu>

          {/* Primary Action: Create Job */}
          <SidebarMenuItem>
            <Link
              href="/admin/jobpost"
              className="flex items-center text-blue-950 font-semibold text-lg space-x-2"
            >
              <IoMdAddCircle className="text-blue-950" />
              <span>Create Job</span>
            </Link>
          </SidebarMenuItem>

          {/* Grouped Admin Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gray-500">
              Admin Panel
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <Link href="/admin/jobs" className="flex items-center space-x-2 text-lg">
                  <TbBriefcase2 className="text-blue-900" />
                  <span>Jobs</span>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/admin/users" className="flex items-center space-x-2 text-lg">
                  <LuUsers className="text-blue-900" />
                  <span>Users</span>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/admin/admins" className="flex items-center space-x-2 text-lg">
                  <RiAdminLine className="text-blue-900" />
                  <span>Admin List</span>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/admin/hr" className="flex items-center space-x-2 text-lg">
                  <RiUserCommunityLine className="text-blue-900" />
                  <span>HR Management</span>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/admin/reports" className="flex items-center space-x-2 text-lg">
                  <MdOutlineReport className="text-blue-900" />
                  <span>Reports</span>
                </Link>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
