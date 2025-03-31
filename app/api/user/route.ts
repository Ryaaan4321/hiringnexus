import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const response = await client.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })
        console.log(response);
        return NextResponse.json({ msg: "you are signed up" })
    }catch(e){
        console.log(e);
        return NextResponse.json({msg:e});
    }
}