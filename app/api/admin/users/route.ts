import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db';

export async function GET(req: NextRequest) {
    try {
        const response = await client.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phonenumber: true,
                profession: true,
                location: true,
                ctc: true,
                skills: true,
                resumeURL: true,
            }
        });
        return NextResponse.json({ response });
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "Failed to fetch users" }, { status: 500 });
    }
}
