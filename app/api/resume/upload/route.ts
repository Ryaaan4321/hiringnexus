import { NextResponse, NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        console.log("userid = ",userId)
        const timestamp = Math.round(new Date().getTime() / 1000);
        const paramsToSign = {
            timestamp,
            public_id: `${userId}-${timestamp}`,
        }
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET!
        );
        console.log(process.env.CLOUDINARY_API_SECRET!)
        return NextResponse.json({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            timestamp,
            signature,
            publicId: `${userId}-${timestamp}`,
        });
    } catch (e: any) {
        console.error("err:", e);
        return NextResponse.json({ err: "err in resume uploading" }, { status: 500 });
    }
}
