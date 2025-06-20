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
import { Button } from "./ui/button";
interface UserSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onApply: (filters: FilterState) => void;
}
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
      plan: "",
    },

  ],


}

export function UserSidebar({
  onApply,
  ...props
}: UserSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    minExperience: null,
    salaryRange: null,
  });
  const { userId } = useUserId();
  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      minExperience: null,
      salaryRange: null,
    });
  };

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
        {/* <SidebarContent> */}
          <Button
            onClick={() => onApply(filters)}
            className="bg-blue-950 text-white rounded-md cursor-pointer w-full"
          >
            Apply Filters
          </Button>
        {/* </SidebarContent> */}
        <SidebarContent>
          <Button
            onClick={clearFilters}
            className="bg-gray-300 text-black rounded-md cursor-pointer w-full"
          >
            Clear All
          </Button>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
