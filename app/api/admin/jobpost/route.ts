import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import { jwtVerify, JWTPayload } from "jose";

interface AdminPayload extends JWTPayload {
    id: string;  // to extract the admin id from here 
    email: string;
}
type JobType = "FULLTIME" | "REMOTE" | "INTERNSHIP" | "CONTRACT";
export default interface jobinterface {
    id: string,
    title: string,
    descreption: string,
    joblink: string,
    postedbyId: string,
    postedby: {
        name: string
    },
    companyname:string,
    experience:number,
    salary:number,
    jobTypes:JobType[]
};
export async function POST(req: NextRequest, res: NextResponse) {
    console.log("this jobpost from the backend got calllleddddd");
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ msg: "token  is missing" }, {
                status: 401
            })
        };
        const { payload } = await jwtVerify<AdminPayload>(token, new TextEncoder().encode(process.env.SECRET_KEY));
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
        const newJob = await client.jobschema.create({
            data: {
                title: body.title,
                descreption: body.descreption,
                joblink: body.joblink,
                postedby: { connect: { id: admin.id } },
                jobTypes:body.jobTypes ,
                experience:body.experience,
                salary:body.salary,
                companyname:body.companyname
            },
            include: {
                postedby: {
                    select:{
                        name:true
                    }
                },
                
            }
        });
        return NextResponse.json({ newJob }, { status: 201 })
    } catch (e: any) {
        console.log("error message = ",e.message);
        return NextResponse.json({ msg: e.message }, { status: 500 });
    }
}
