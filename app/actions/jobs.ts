"use server"
import client from '@/app/db'
import { jwtVerify, JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import userinterface  from '@/interfaces/user'
import jobinterface from '../api/admin/jobpost/route'
import { usersemail } from '@/interfaces/user'


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
                experience:true,
                salary:true,  
            }
        });
        console.log("type of the jobs from the actioon  = ", jobs);
        return jobs
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}