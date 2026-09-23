"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'
import { jobFilters, jobinterface } from '@/interfaces/jobinterface'

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
                createdAt: true,
                location: true

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
                location: true,
                createdAt: true
            }
        });
        return response;
    } catch (e: any) {
        return null;
    }
}

export async function getFilteredJobs(filters: jobFilters) {
    try {
        const conditions: any[] = [];

        if (filters.jobTypes && filters.jobTypes.length > 0) {
            conditions.push({
                jobTypes: {
                    hasSome: filters.jobTypes,
                },
            });
        }

        if (filters.minExperience !== undefined && filters.minExperience !== null) {
            if (filters.minExperience === 0) {
                conditions.push({
                    experience: {
                        lte: 0,
                    },
                });
            } else if (filters.minExperience === 1) {
                conditions.push({
                    experience: {
                        gte: 1,
                        lte: 3,
                    },
                });
            } else if (filters.minExperience === 3) {
                conditions.push({
                    experience: {
                        gte: 3,
                        lte: 5,
                    },
                });
            } else if (filters.minExperience === 5) {
                conditions.push({
                    experience: {
                        gte: 5,
                    },
                });
            } else {
                conditions.push({
                    experience: {
                        lte: filters.minExperience,
                    },
                });
            }
        }

        if (filters.salaryRange && Array.isArray(filters.salaryRange)) {
            const min = filters.salaryRange[0];
            const max = filters.salaryRange[1];
            const lpaMin = min > 1000 ? Math.floor(min / 100000) : min;
            const lpaMax = max > 1000 ? Math.ceil(max / 100000) : max;
            const rawMin = min <= 1000 ? min * 100000 : min;
            const rawMax = max <= 1000 ? max * 100000 : max;

            const lpaCondition = lpaMax >= 100 ? { gte: lpaMin } : { gte: lpaMin, lte: lpaMax };
            const rawCondition = rawMax >= 10000000 ? { gte: rawMin } : { gte: rawMin, lte: rawMax };

            conditions.push({
                OR: [
                    {
                        salary: lpaCondition,
                    },
                    {
                        salary: rawCondition,
                    },
                ],
            });
        }

        const whereClause = conditions.length > 0 ? { AND: conditions } : {};

        const jobs_res = await client.jobschema.findMany({
            where: whereClause,
            orderBy: { timestamps: "desc" },
            include: {
                postedby: { select: { name: true } },
                postedbyUser: { select: { name: true } },
            },
        });
        return jobs_res;
    } catch {
        return [];
    }
}

