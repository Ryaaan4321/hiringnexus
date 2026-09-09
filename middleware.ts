import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ msg: "Authentication token required" }, { status: 401 });
    }
    const signinUrl = new URL("/auth/admin/signin", req.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY not configured");
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    // Role-based access control for admin routes
    if (payload.role !== "admin") {
      if (isApiRoute) {
        return NextResponse.json({ msg: "Forbidden: Admin privileges required" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/auth/admin/signin", req.url));
    }

    return NextResponse.next();
  } catch (e: any) {
    if (isApiRoute) {
      return NextResponse.json({ msg: "Invalid or expired authentication token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/admin/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/jobpost",
    "/api/admin/users",
  ],
};
