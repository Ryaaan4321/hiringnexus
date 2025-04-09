import { NextResponse } from "next/server";
import client from '@/app/db'
export async function POST() {
    try {
        const response = await client.jobtype.createMany({
            data: [
                { name: "Fulltime" },
                { name: "Internship" },
                { name: "Remote" },
                { name: "Contract" },
            ],
        });
        return NextResponse.json({msg:"added the type of the jobs succccessfulyyyyy",response},{status:201});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg: "there is some error in the jobtype post fucc" }, { status: 501 });
    }
}