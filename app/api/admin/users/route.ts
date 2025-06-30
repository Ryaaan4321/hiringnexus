import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
export async function GET(req: NextResponse) {
    try {
        const response = await client.user.findMany({});
        return NextResponse.json({ response });
    } catch (e) {
        return NextResponse.json({ msg: e });
    }
}
