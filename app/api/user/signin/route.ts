import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import SECRET_KEY from "@/app/lib/config";
import { cookies } from "next/headers";
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const cookiestore = await cookies();
        const body = await req.json();
        const isuser = await client.user.findFirst({
            where: {
                email: body.email
            }
        })
        if (!isuser) {
            return NextResponse.json({ msg: "user is not found with this email" }, { status: 401 });
        }
        const isvaliduser = await bcrypt.compare(body.password, isuser.password);
        if (!isvaliduser) {
            return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });
        }
        const { password, ...userwithoutpassword } = isuser;
        const token = jwt.sign(
            { id: isuser.id, email: isuser.email },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        cookiestore.set("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/",
        });
        return NextResponse.json( {userwithoutpassword , token},{ status: 201 });
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ msg: e.message || "error in the user signin func" }, { status: 500 });
    }
}