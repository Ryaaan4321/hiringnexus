"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Proportions,
  Asterisk

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { ShieldUser } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAdminData } from "@/hooks/admin"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { admin, loading } = useAdminData();
  const data = {
    user: {
      name: admin?.username ?? "admin...",
      email: admin?.email ?? "admin.email.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "HiringNexus",
        logo: Asterisk,
        plan: "Enterprise",
      },

    ],
    navMain: [
      {
        title: "Create Job",
        url: "/admin/createjob",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Bot,
      },
      {
        title: "Jobs",
        url: "/admin/jobs",
        icon: BookOpen,
      },
      {
        title: "AdminList",
        url: "/admin/adminlist",
        icon: ShieldUser
      },
      {
        title: "HR",
        url: "#",
        icon: Settings2,

      },
      {
        title: "Report",
        url: "#",
        icon: Proportions
      }
    ],

  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
