"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'
import userinterface, { userDetail } from '@/interfaces/user'
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
        console.log("type of users from the getallusers = ",typeof(users))
        return users as userinterface[];
        // because the type of the users is object so i cased them back into the array 
        // so they dont jerk the error again win win
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}
export async function getEmailOfUsers(): Promise<usersemail[]> {
    console.log("get all user email from the action got called");
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
export async function getDetailsofUser(id: string): Promise<userDetail | null> {
    try {
        const res: userDetail | null = await client.user.findUnique({
            where: { id },
            select: {
                username: true,
                profession: true
            }
        });
        return res;
    } catch (e: any) {
        console.log(e.message);
        return null;
    }
}

// to get the all the jobs in the type of the array i have used the the jobinterface
