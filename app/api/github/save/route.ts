import client from '@/app/db'
import { NextResponse } from 'next/server';
import { toDBProfile, toDBRepository } from "@/utils/github.convertor";

export async function POST(request: Request) {
    const { userId, profile, repositories } = await request.json();
    const savedData = await client.user.update({
        where: { id: userId },
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
}