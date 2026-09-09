"use client";

import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/user/login" || pathname === "/user/signup";

  return (
    <section className="min-h-screen">
      {!isAuthPage && <Navigation />}
      <div className={!isAuthPage ? "pt-16" : ""}>
        {children}
      </div>
    </section>
  );
}
  