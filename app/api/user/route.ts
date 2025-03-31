import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import bcrypt from 'bcryptjs'
import { hash } from "crypto";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const hashedpassword = await bcrypt.hashSync(body.password,10);
        const response = await client.user.create({
            data: {
                name: body.name,
                email: body.email,
                password:hashedpassword,
                phonenumber:body.phonenumber,
            }
        })
        console.log(response);
        return NextResponse.json({ response },{status:201})
    }catch(e){
        console.log(e);
        return NextResponse.json({msg:e},{status:501});
    }
}