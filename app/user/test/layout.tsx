"use client"
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UserSidebar } from "@/components/UserSidebar";
import SidebarII from "@/components/SidebarII";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <div className="flex flex-1 overflow-hidden">
          {/* <UserSidebar  onApply={()=>{}} /> */}
          <main className="flex-1 overflow-y-auto p-4">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}