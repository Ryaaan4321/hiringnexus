import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const token = req.cookies.get("token")?.value;
  if (!token) {
    if (isAuthPage) {
      return NextResponse.next();
    }
    if (isApiRoute) {
      return NextResponse.json({ msg: "Authentication token required" }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY not configured");
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    const userRole = String(payload.role || "").toUpperCase();
    if (isAuthPage) {
      const homeDashboard =
        userRole === "ADMIN"
          ? "/admin"
          : userRole === "RECRUITER"
            ? "/recruiter/dashboard"
            : "/user/dashboard";
      return NextResponse.redirect(new URL(homeDashboard, req.url));
    }
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      if (userRole !== "ADMIN") {
        if (isApiRoute) {
          return NextResponse.json({ msg: "Forbidden: Admin privileges required" }, { status: 403 });
        }
        if (userRole === "RECRUITER") {
          return NextResponse.redirect(new URL("/recruiter/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }
    if (pathname.startsWith("/recruiter")) {
      if (userRole !== "RECRUITER" && userRole !== "ADMIN") {
        if (isApiRoute) {
          return NextResponse.json({ msg: "Forbidden: Recruiter privileges required" }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }
    if (pathname.startsWith("/user")) {
      if (userRole !== "CANDIDATE") {
        if (isApiRoute) {
          return NextResponse.json({ msg: "Forbidden: Candidate privileges required" }, { status: 403 });
        }
        if (userRole === "RECRUITER") {
          return NextResponse.redirect(new URL("/recruiter/dashboard", req.url));
        }
        if (userRole === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
      }
    }

    return NextResponse.next();
  } catch (e: any) {
    if (isApiRoute) {
      return NextResponse.json({ msg: "Invalid or expired authentication token" }, { status: 401 });
    }
    if (isAuthPage) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/jobpost",
    "/api/admin/users",
    "/recruiter",
    "/recruiter/:path*",
    "/user",
    "/user/:path*",
    "/login",
    "/signup",
  ],
};
