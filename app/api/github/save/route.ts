import client from '@/app/db';
import { NextResponse, NextRequest } from 'next/server';
import { toDBProfile, toDBRepository } from "@/utils/github.convertor";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const cookiestore = await cookies();
        const token = cookiestore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ err: "Authentication required" }, { status: 401 });
        }

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ err: "Server configuration error" }, { status: 500 });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
        const authUserId = payload.id as string;

        const body = await request.json();
        const { profile, repositories } = body;
        const targetUserId = body.userId || authUserId;

        if (targetUserId !== authUserId) {
            return NextResponse.json({ err: "Unauthorized user ID" }, { status: 403 });
        }

        const savedData = await client.user.update({
            where: { id: authUserId },
            data: {
                githubprofile: {
                    upsert: {
                        create: {
                            ...toDBProfile(profile),
                            repositories: {
                                create: repositories.map(toDBRepository)
                            }
                        },
                        update: {
                            ...toDBProfile(profile),
                            updatedAt: new Date(),
                            repositories: {
                                deleteMany: {},
                                create: repositories.map(toDBRepository)
                            }
                        }
                    }
                }
            },
            include: {
                githubprofile: {
                    include: { repositories: true }
                }
            }
        });

        return NextResponse.json(savedData.githubprofile);
    } catch (e: any) {
        return NextResponse.json({ err: e.message || "Failed to save GitHub data" }, { status: 500 });
    }
}