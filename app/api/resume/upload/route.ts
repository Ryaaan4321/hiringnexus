import { NextResponse, NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { jwtVerify } from "jose";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ err: "Authentication required" }, { status: 401 });
        }

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ err: "Server configuration error" }, { status: 500 });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
        const authUserId = payload.id as string;

        const body = await req.json();
        const userId = body.userId || authUserId;

        // Prevent IDOR: caller can only sign for their own user ID
        if (userId !== authUserId) {
            return NextResponse.json({ err: "Unauthorized user ID" }, { status: 403 });
        }

        if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
            return NextResponse.json({ err: "Cloudinary credentials not configured" }, { status: 500 });
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const paramsToSign = {
            timestamp,
            public_id: `${authUserId}-${timestamp}`,
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );

        return NextResponse.json({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            timestamp,
            signature,
            publicId: `${authUserId}-${timestamp}`,
        });
    } catch (e: any) {
        return NextResponse.json({ err: "Failed to generate upload signature" }, { status: 500 });
    }
}
