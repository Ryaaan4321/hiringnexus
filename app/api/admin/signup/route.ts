import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const hashedpassword = await bcrypt.hashSync(body.password, 10);
        const response = await client.admin.create({
            data: {
                id: uuidv4(),
                name: body.name,
                email: body.email,
                password: hashedpassword,
                phonenumber: body.phonenumber,
                username: body.username,
                canPostJob:body.canPostJob,
                canDeleteJob:body.canDeleteJob
            }
        })
        if (!process.env.SECRET_KEY) throw new Error("secret key is not defined");
        const token = jwt.sign({ id: response.id, email: response.email, role: "admin",canDeleteJob:response.canDeleteJob }, process.env.SECRET_KEY, { expiresIn: "1h" });
        return NextResponse.json({ response, token }, { status: 201 })
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "error in the admin signup func" }, { status: 500 });
    }
}
export async function GET(req: NextResponse) {
    try {
        const response = await client.user.findMany({});
        return NextResponse.json({ response });
    } catch (e) {
        return NextResponse.json({ msg: e });
    }
}