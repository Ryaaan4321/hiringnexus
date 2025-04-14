import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // console.log("middleware got called");
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
        return NextResponse.json({ msg: "token is not provided" }, { status: 401 });
    }

    const response = await fetch("http://localhost:3000/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/admin/jobpost",
        "/api/admin/users",
    ],
};
