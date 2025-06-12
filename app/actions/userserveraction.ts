"use server"
import client from '@/app/db'
import { jwtDecrypt, JWTPayload, jwtVerify } from 'jose'
import userinterface, { userDetail } from '@/interfaces/userinterface'
import { usersemail } from '@/interfaces/userinterface'
import { cookies } from 'next/headers'
import { safeuserupdateinput } from '@/interfaces/userinterface'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth'
import { recentappliedJob } from '@/interfaces/jobinterface'

interface AdminPayload extends JWTPayload {
    id: string,
    email: string
}
export default interface admininterface {
    id: string,
    username: string,
    email: string,
}
export interface adminwithjobcountinterface extends admininterface {
    jobcount: number;
}
export async function getallusers(): Promise<userinterface[]> {
    try {
        const users = await client.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phonenumber: true,
                profession: true
            }
        });
        return users as userinterface[];
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}
export async function getEmailOfUsers(): Promise<usersemail[]> {
    try {
        const usersemail: usersemail[] = await client.user.findMany({
            select: {
                email: true
            }
        })
        return usersemail;
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}
export async function getDetailsofUser(id: string | null | undefined): Promise<userDetail | null> {
    if (!id) return null;
    try {
        const res = await client.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                profession: true,
                name: true,
                phonenumber: true,
                email: true,
                descreption: true,
                location: true,
                ctc: true,
                alreadyapplied: {
                    select: {
                        id: true,
                        title: true,
                        descreption: true,
                        joblink: true,
                        postedbyId: true,
                        timestamps: true,
                    },
                },
                githubprofile: {
                    select: {
                        id: true,
                        username: true,
                        htmlUrl: true,
                        followers: true,
                        following: true,
                        publicRepos: true,
                        repositories: {
                            select: {
                                id: true,
                                name: true,
                                htmlUrl: true,
                                stargazersCount: true,
                            },
                        },
                    },
                },
            },
        });
        return res;
    } catch (e: any) {
        console.log(e.message);
        return null;
    }
}
export async function getidOfUser(): Promise<string | null> {
    try {
        const cookiestore = cookies();
        const token = (await cookiestore).get("token")?.value;
        if (!token || typeof token !== "string" || token.split('.').length !== 3) {
            const session = await getServerSession(NEXT_AUTH_CONFIG);
            return session?.user?.id || null;
        }
        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is not defined");
            const session = await getServerSession(NEXT_AUTH_CONFIG);
            return session?.user?.id || null;
        }
        try {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            const { payload } = await jwtVerify(token, secret);
            if (!payload?.id) {
                const session = await getServerSession(NEXT_AUTH_CONFIG);
                return session?.user?.id || null;
            }
            return payload.id as string;
        } catch (jwtError) {
            console.error("error verifying JWT: ", jwtError);
            const session = await getServerSession(NEXT_AUTH_CONFIG);
            return session?.user?.id || null;
        }

    } catch (e: any) {
        console.error("error in getidOfUser: ", e.message);
        return null;
    }
}
export async function updateUserDetails(id: string, fieldstoupdate: Partial<safeuserupdateinput>) {
    try {
        if (!id) return { success: false, msg: "please please login first!" };
        const updated = await client.user.update({
            where: { id },
            data: fieldstoupdate
        })
        console.log("id from the server action ", id)
        console.log("updated data from the userserver action ", updated);
        return updated;
    } catch (e: any) {
        console.log("err from the update user details = ", e.message);
        return null;
    }
}
export async function visitedJobs(jobId: string, userId: string) {
    try {
        const alreadyApplied = await client.user.findFirst({
            where: { id: userId, alreadyapplied: { some: { id: jobId } } },
        });
        if (alreadyApplied) return { success: false, msg: "you have already visited this job" };
        await client.user.update({
            where: { id: userId },
            data: { alreadyapplied: { connect: { id: jobId } } },
        });
        return { success: true };
    } catch (err: any) {
        return { success: false, err: err.message };
    }
}
export async function getRecentappliedJobsOfUser(userId: string): Promise<recentappliedJob[] | null> {
    try {
        const userwithjobs = await client.user.findUnique({
            where: { id: userId },
            include: {
                alreadyapplied: {
                    orderBy: {
                        timestamps: 'desc'
                    },
                    take: 3,
                    select: {
                        id: true,
                        title: true,
                        companyname: true,
                        timestamps: true,
                    }
                },
            }
        });
        return userwithjobs?.alreadyapplied || [];
    } catch (e: any) {
        console.log(e.message);
        return null;
    }
}
