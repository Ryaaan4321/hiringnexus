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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
