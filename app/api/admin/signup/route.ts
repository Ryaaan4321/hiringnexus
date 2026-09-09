import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const cookiestore = await cookies();

        // Admin invitation secret validation
        const requiredSecret = process.env.ADMIN_SIGNUP_SECRET;
        if (requiredSecret) {
            const providedSecret = body.specailid || body.adminSecret || body.specialid;
            if (providedSecret !== requiredSecret) {
                return NextResponse.json({ msg: "Invalid admin authorization secret key" }, { status: 403 });
            }
        }

        if (!body.email || !body.password) {
            return NextResponse.json({ msg: "Email and password are required" }, { status: 400 });
        }

        const existingAdmin = await client.admin.findUnique({
            where: { email: body.email }
        });
        if (existingAdmin) {
            return NextResponse.json({ msg: "Admin with this email already exists" }, { status: 409 });
        }

        const hashedpassword = await bcrypt.hash(body.password, 10);
        const response = await client.admin.create({
            data: {
                id: uuidv4(),
                name: body.name || "Admin",
                email: body.email,
                password: hashedpassword,
                phonenumber: body.phonenumber || "",
                username: body.username || `admin_${Math.random().toString(36).substring(7)}`,
                canPostJob: body.canPostJob ?? true,
                canDeleteJob: body.canDeleteJob ?? true,
            }
        });

        if (!process.env.SECRET_KEY) throw new Error("secret key is not defined");
        const token = jwt.sign(
            { id: response.id, email: response.email, role: "admin", canDeleteJob: response.canDeleteJob },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        cookiestore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/",
        });

        // Omit password hash from response
        const { password: _, ...adminWithoutPassword } = response;
        return NextResponse.json({ response: adminWithoutPassword, token }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "error in the admin signup func" }, { status: 500 });
    }
}