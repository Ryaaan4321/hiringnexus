"use client"
import Link from "next/link"
import { Asterisk } from 'lucide-react';
import { Buttons } from "./ui/button"
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const isuser = pathname.startsWith("/user");
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <div>
          <Link href="/user/dashboard" className="flex items-center space-x-0">
            <Asterisk className="h-10 w-10" />
            <span className="font-bold text-xl">HiringNexus</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">{
          isuser &&
          <Buttons variant="default" size="sm" className="bg-blue-900 cursor-pointer">
            Sign In
          </Buttons>}
        </div>
      </div>
    </header>

  )
}
