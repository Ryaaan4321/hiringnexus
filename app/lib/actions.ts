"use server"
import client from '@/app/db'
import SECRET_KEY from './config'
import { jwtVerify, JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import userinterface from '../api/user/signup/route'
import jobinterface from '../api/admin/jobpost/route'
import admininterface from '../api/admin/signup/route'
import { GiTrumpet } from 'react-icons/gi'

interface AdminPayload extends JWTPayload {
    id: string,
    email: string
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
export async function getallusers():Promise<userinterface[]> {
    try{
        const users:userinterface[]=await client.user.findMany({
            select:{
                id:true,
                name:true,
                username:true,
                email:true,
                phonenumber:true,
                profession:true

            }
        })
        return users;
    }catch(e:any){
        console.log(e.message);
        return [];
    }
    
}

// to get the all the jobs in the type of the array i have used the the jobinterface

export async function getalladmins():Promise<admininterface[]>{
    try{
        const admins:admininterface[]=await client.admin.findMany({
            select:{
                id:true,
                username:true,
                email:true,
                postedjobs:true

            }
        })
        return admins;
    }catch(e:any){
        console.log(e.message);
        return [];
    }
}