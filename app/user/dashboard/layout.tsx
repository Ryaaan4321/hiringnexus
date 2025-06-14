"use client"
import Header from "@/components/Header";
import { useState } from "react";
export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <Header ontogglesidebar={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        <main className="flex-1 p-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}