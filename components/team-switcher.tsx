"use client"
import { LogOut } from 'lucide-react';
import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { userLogout } from '@/app/actions/userserveraction';
import Link from "next/link";
import { useUserId } from '@/hooks/user';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const { userId } = useUserId();
  console.log("user id from the team switcher = ", userId); 
  const router = useRouter();
  if (!activeTeam) {
    return null
  }
  async function handleLogout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        cache: 'no-store'
      })
      await userLogout
      router.push('/user/dashboard')
    } catch (e: any) {
      console.log(e.message);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">HiringNexus</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Your Profile
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                className="gap-2 p-2 cursor-pointer"
              >
                <Link href={`/user/profile/${userId}`}>
                  <div className='flex items-center space-x-1.5'>
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <team.logo className="size-3.5 shrink-0" />
                    </div>
                    <div className='font-medium text-base cursor-pointer'> {team.name}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="gap-2 p-2 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="flex size-6 items-center justify-center font-semibold rounded-md border">
                <LogOut strokeWidth={2} className='cursor-pointer' />
              </div>
              <span className='font-medium text-base '>Signout</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
