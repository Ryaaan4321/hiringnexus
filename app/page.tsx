"use client"
import { Asterisk } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="flex flex-col items-center font-semibold text-black w-full max-w-xl">
        <div className="flex flex-wrap items-center justify-center w-full space-y-2">
          <div className="font-semibold text-gray-700 text-lg sm:text-xl md:text-4xl lg:text-4xl">
            One Stop for the HR and the <span className="bg-slate-800 text-white p-1 text-3xl">Students </span>
          </div>
          <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
            HiringNexus
          </div>
          <Link href="/auth/user/signin" className="w-auto">
            <div className="text-lg sm:text-xl md:text-2xl text-gray-700 ml-4">
              Start your Journey <span className="bg-slate-900 text-white p-1 ">Now</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
