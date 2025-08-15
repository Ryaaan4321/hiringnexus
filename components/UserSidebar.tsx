// components/user/UserSidebar.tsx
"use client";

import Filters from "./FilterinJobs";
import { useState } from "react";
import { useUserId } from "@/hooks/user";
import { FilterState } from "./SidebarII";
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { Asterisk } from "lucide-react";
import { Buttons } from "./ui/button";
import { useUserDetails } from "@/hooks/user";
interface UserSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onApply: (filters: FilterState) => void;
}

console.log("user sidebar got called")
export function UserSidebar({
  onApply,
  ...props
}: UserSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    minExperience: null,
    salaryRange: null,
  });
  const { completeUser, err } = useUserDetails();
  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      minExperience: null,
      salaryRange: null,
    });
  };


  if (!completeUser) {
    return "something went wrong in the login"
  }

  const data1 = {
    user: {
      name: completeUser.name,
      email: completeUser.email,
      avatar: ""
    },
    teams: [
      {
        name: completeUser.name,
        logo: Asterisk,
        plan: "",
      }
    ]
  }
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data1.teams} />
      </SidebarHeader>
      <SidebarContent>
        {!props.collapsible && (
          <Filters filters={filters} onChange={setFilters} />
        )}
      </SidebarContent>
      <SidebarSeparator
        orientation="horizontal"
        className="mr-2 data-[orientation=vertical]:h-4"
      />

      <SidebarFooter>
        <SidebarContent>
          <Buttons
            onClick={() => onApply(filters)}
            className="bg-blue-950 text-white rounded-md cursor-pointer w-full"
          >
            Apply Filters
          </Buttons>
        </SidebarContent>
        <SidebarContent>
          <Buttons
            onClick={clearFilters}
            className="bg-gray-300 text-black rounded-md cursor-pointer w-full"
          >
            Clear All
          </Buttons>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
