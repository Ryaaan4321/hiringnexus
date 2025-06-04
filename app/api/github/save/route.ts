import client from '@/app/db'
import { NextResponse } from 'next/server';
import { toDBProfile, toDBRepository } from "@/utils/github.convertor";

export async function POST(request: Request) {
    const { userId, profile, repositories } = await request.json();
    if(!userId){
        return NextResponse.json({err:"please login first from the github post req"},{status:400})
    }
    console.log("userid from the github save request = ",userId);
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
    console.log("saveddata from the github profile =",savedData.githubprofile)
    return NextResponse.json(savedData.githubprofile);
}