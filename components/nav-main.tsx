import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAdminData } from "@/hooks/admin"
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {
  const {admin,loading}=useAdminData();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold flex space-x-1">Welcome    {admin?.username}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              asChild
              className={item.isActive ? "bg-muted " : ""}
            >
              <a href={item.url} className="flex items-center gap-2">
                {item.icon && <item.icon />}
                <span className="text-base font-medium">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
