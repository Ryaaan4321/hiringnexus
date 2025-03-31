import { NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
import SECRET_KEY from "@/app/lib/config";
import client from "@/app/db";

interface AdminPayload extends JWTPayload {
    id: string,// check this part of the code may be this will brake may be 
    email: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const token = body.token;
        if (!token) return NextResponse.json({ msg: "no token" }, { status: 401 });
        // console.log("token from the auth fucc  = ",token);
        const { payload } = await jwtVerify<AdminPayload>(token, new TextEncoder().encode(SECRET_KEY));
        const findadmin = await client.admin.findFirst({
            where: { email: payload.email }
        });

        if (!findadmin) return NextResponse.json({ msg: "chor hai admin ni" }, { status: 403 });

        return NextResponse.json({ msg: "hann bhai hai apna" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "laudee" }, { status: 401 });
    }
}
