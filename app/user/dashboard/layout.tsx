"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/UserSidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <UserSidebar onApply={() => {}} /> {/* Move it here */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
