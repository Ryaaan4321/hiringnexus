// C:\Users\aryan\Desktop\hiringnexus\app\admin\adminlist\page.tsx
"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'


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
export async function getalladmins(): Promise<adminwithjobcountinterface[]> {
    try {
        const admins = await client.admin.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                
            }
        });
        const adminWithJobCounts = await Promise.all(
            admins.map(async (admin) => {
                const jobcount = await client.jobschema.count({
                    where: {
                        postedbyId: admin.id
                    }
                });
                return {
                    ...admin,
                    jobcount
                };
            })
        );
        return adminWithJobCounts;
    } catch (e: any) {
        console.log(e.message);
        return [];
    }
}