import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ msg: "token is not provided" }, { status: 401 });
  }
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    await jwtVerify(token, secret);
    
    return NextResponse.next();
  } catch (e: any) {
    console.log("error from the token", e.message);
    return new NextResponse(
      JSON.stringify({ msg: "token not provided probably" }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }
}
export const config = {
  matcher: [
    "/api/admin/jobpost",
    "/api/admin/users",
    "/admin/users",
    "/admin/adminlist",
    "/admin/jobs",
    "/admin/createjob",
    "/admin/hr",
    "/admin/report"
  ],
};
