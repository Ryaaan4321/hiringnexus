import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./lib/utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // console.log("token from middleware = ",token)
  if (!token) {
    return NextResponse.json({ msg: "token is not provided" }, { status: 401 });
  }
  const isValid = await validateToken(token);
  if (!isValid) {
    console.log("error from the file middleware ")
    return NextResponse.json({ msg: "invalid token" }, { status: 401 });
  }
  return NextResponse.next();
}
export const config = {
    matcher: [
        "/api/admin/jobpost",
        "/api/admin/users",
    ],
};
