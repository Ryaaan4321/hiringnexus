import { NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
import SECRET_KEY from "@/app/lib/config";
import client from "@/app/db";

interface AdminPayload extends JWTPayload {
    email: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const token = body.token;
        if (!token) return NextResponse.json({ msg: "No token provided" }, { status: 401 });

        const { payload } = await jwtVerify<AdminPayload>(token, new TextEncoder().encode(SECRET_KEY));
        const findadmin = await client.admin.findFirst({
            where: { email: payload.email }
        });

        if (!findadmin) return NextResponse.json({ msg: "Not an admin" }, { status: 403 });

        return NextResponse.json({ msg: "Valid admin" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "Invalid token" }, { status: 401 });
    }
}
