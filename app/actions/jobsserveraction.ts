"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'
import { jobFilters, jobinterface } from '@/interfaces/jobinterface'
import { JobType, EnumJobType } from '@/interfaces/jobinterface'
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

export async function getFilteredJobs(filters: jobFilters) {
    return await client.jobschema.findMany({
        where: {
            AND: [
                filters.jobTypes?.length ? {
                    jobTypes: {
                        hasSome: filters.jobTypes
                    }
                } : {},
                filters.minExperience ? {
                    experience: {
                        gte: filters.minExperience
                    }
                } : {},
                filters.salaryRange ? {
                    salary: {
                        gte: filters.salaryRange[0] * 100000,
                        lte: filters.salaryRange[1] * 100000
                    }
                } : {}
            ].filter(condition => Object.keys(condition).length > 0)
        },
        orderBy: { timestamps: 'desc' },
        include: {
            postedby: { select: { name: true } }
        }
    });
}

