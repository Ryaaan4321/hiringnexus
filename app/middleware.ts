import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import SECRET_KEY from "@/app/lib/config";
import client from '@/app/db'

export async function middleware(req: NextRequest) {
    try {
        const token = req.cookies.get("access_token")?.value;
        if (!token) {
            return NextResponse.json({ msg: "chor hai chor hai" }, { status: 500 });
        }
        const decoded: any = jwt.verify(token, SECRET_KEY);
        const findadmin = await client.admin.findFirst({
            where: decoded.email
        })
        if (!findadmin) {
            return NextResponse.json({ msg: "you are not a admin" }, { status: 404 });
        }
        return NextResponse.next();
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ msg: "invalid token or the admin is logged in" }, { status: 501 });
    }
}
export const config = {
    matcher: [
        "/api/admin/:path",
        "!/api/admin/signup",
        "!/api/admin/signin"
    ]
}