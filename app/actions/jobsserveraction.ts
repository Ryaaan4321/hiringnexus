"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'
import jobinterface, { recentappliedJob } from '@/interfaces/jobinterface'
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
export async function getalljobs(): Promise<jobinterface[]> {
    try {
        const jobs: jobinterface[] = await client.jobschema.findMany({
            select: {
                id: true,
                title: true,
                descreption: true,
                joblink: true,
                postedbyId: true,
                postedby: {
                    select: {
                        name: true
                    }
                },
                companyname: true,
                jobTypes: true,
                experience: true,
                salary: true,
            }
        });
        return jobs
    } catch (e: any) {
        return [];
    }
}
export async function getSingleJob(id: string): Promise<jobinterface | null> {
    try {
        const response = await client.jobschema.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                descreption: true,
                joblink: true,
                postedbyId: true,
                postedby: {
                    select: {
                        name: true
                    }
                },
                companyname: true,
                jobTypes: true,
                experience: true,
                salary: true,
            }
        });
        return response;
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
