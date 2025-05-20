"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'
import userinterface  from '@/interfaces/user'
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

export async function getallusers(): Promise<userinterface[]> {
    console.log("get all users from the actions got called");
    try {
        const users: userinterface[] = await client.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phonenumber: true,
                profession: true
            }
        })
        return users;
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}
export async function getEmailOfUsers():Promise<usersemail[]>{
    console.log("get all user email from the action got called");
    try{
        const usersemail:usersemail[]=await client.user.findMany({
            select:{
                email:true
            }
        })
        return usersemail;
    }catch(e:any){
        console.log(e.message);
        return [];
    }
}

// to get the all the jobs in the type of the array i have used the the jobinterface
