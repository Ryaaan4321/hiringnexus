"use client"
import Link from "next/link"
import { Buttons } from "./ui/button"
import { useRouter } from "next/navigation"
export default function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-slate-800">HiringNexus</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/jobs" className="text-gray-700 hover:text-slate-800 font-medium">
                            Jobs
                        </Link>
                        <Link href="/companies" className="text-gray-700 hover:text-slate-800 font-medium">
                            Companies
                        </Link>
                        <Link href="/students" className="text-gray-700 hover:text-slate-800 font-medium">
                            Students
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-slate-800 font-medium">
                            About
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link href='/user/login'>
                        <Buttons variant="ghost" className="text-slate-800 hover:bg-slate-100 cursor-pointer">
                            Sign In
                        </Buttons>
                        </Link>
                        <Link href='/user/signup'>
                        <Buttons className="bg-slate-800 hover:bg-slate-700 text-white cursor-pointer">Sign Up</Buttons>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
