"use server"
import client from '@/app/db'
import SECRET_KEY from './config'
import { jwtVerify, JWTPayload } from 'jose'
import { cookies } from 'next/headers'


interface AdminPayload extends JWTPayload {
    id: string,
    email: string
}
export default interface jobinterface {
    id: string,
    title: string,
    descreption: string,
    joblink: string,
    postedbyId: string,
    postedby: {
        name: string
    },
    companyname:string,
    jobTypes: {
        name: string
    }[]
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
                companyname:true,
                jobTypes: {
                    select: {
                        name: true
                    }
                }
            }
        });
        console.log("type of the jobs from the actioon  = ", jobs);
        return jobs
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}
// to get the all the jobs in the type of the array i have used the
// the jobinterface
