"use server"
import client from '@/app/db'
import { jwtDecrypt, JWTPayload, jwtVerify } from 'jose'
import userinterface, { userDetail } from '@/interfaces/user'
import { usersemail } from '@/interfaces/user'
import { cookies } from 'next/headers'
import { decode } from 'punycode'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth'


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
        console.log("type of users from the getallusers = ", typeof (users))
        console.log("users from the server action of the users = ", users);
        return users as userinterface[];

        // because the type of the users is object so i casted them back into the array 
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
                alreadyapplied: {
                    select: {
                        id: true,
                        title: true,
                        descreption: true,
                        joblink: true,
                        postedbyId: true,
                        timestamps: true,
                    }
                }
            }
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
            console.log("no or invalid token format");
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
                console.log("no id in payload");
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







