import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import SECRET_KEY from "@/app/lib/config";
import { jwtVerify, JWTPayload } from "jose";

interface AdminPayload extends JWTPayload {
    id: string;  // to extract the admin id from here 
    email: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const token = req.cookies.get("access_token")?.value;
        if (!token) {
            return NextResponse.json({ msg: "token  is missing" }, {
                status: 401
            })
        };
        const { payload } = await jwtVerify<AdminPayload>(token, new TextEncoder().encode(SECRET_KEY));
        const adminId = payload.id;
        const body = await req.json();
        const admin = await client.admin.findUnique({
            where: {
                id: adminId
            }
        })
        if (!admin) {
            return NextResponse.json({ msg: "admin not found from the token" }, { status: 404 });
        }
        console.log("admin id = ", admin.id)
        const jobtypestoconnect = body.jobTypes.map((type: string) => ({ name: type }));
        const newJob = await client.jobschema.create({
            data: {
                title: body.title,
                descreption: body.descreption,
                joblink: body.joblink,
                postedby: { connect: { id: admin.id } },
                jobTypes: {
                    connect:jobtypestoconnect
                },
                companyname:body.companyname
            },
            include: {
                postedby: {
                    select:{
                        name:true
                    }
                },
                jobTypes: true
            }
        });
        console.log("job type  = ", body.jobTypes)
        return NextResponse.json({ newJob }, { status: 201 })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ msg: e.message }, { status: 500 });
    }
}
// export async function GET(){
//     try{
//         const response=await client.jobschema.findMany();
//         return NextResponse.json({response})
//     }catch(e){
//         console.log(e);
//         return NextResponse.json(e);
//     }
// }