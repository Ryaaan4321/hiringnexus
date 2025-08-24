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
import { revalidatePath } from 'next/cache'

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
                skills: true,
                alreadyapplied: {
                    select: {
                        id: true,
                        title: true,
                        descreption: true,
                        joblink: true,
                        postedbyId: true,
                        timestamps: true,
                        companyname: true,
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
        return null;
    }
}
export async function getidOfUser(): Promise<string | null> {
    // console.log("get id of user got called");
    try {
        const cookiestore = cookies();
        const token = (await cookiestore).get("token")?.value;
        // if (!token) {
        //     return null;
        // }
        try {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            const { payload } = await jwtVerify(token, secret);
            return payload.id as string;
        } catch (jwtError) {
            console.error("error verifying JWT: ", jwtError);
            return null;
        }

    } catch (e: any) {
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
        revalidatePath(`/user/test-profile/${id}`)
        return updated;
    } catch (e: any) {
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
                    take: 4,
                    select: {
                        id: true,
                        title: true,
                        companyname: true,
                        timestamps: true,
                    }
                },
            }
        });
        console.log("user with jobs from server actions = ", userwithjobs);
        return userwithjobs?.alreadyapplied || [];
    } catch (e: any) {
        return null;
    }
}
export async function userLogout() {
    (await cookies()).delete("next-auth.session-token");
    (await cookies()).delete("next-auth.csrf-token");
    (await cookies()).delete("next-auth.callback-url");
    (await cookies()).delete("next-auth.state");
    (await cookies()).delete("nextauth.message");
    (await cookies()).delete("token");
    (await cookies()).delete("access_token");
}
