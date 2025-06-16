// C:\Users\aryan\Desktop\hiringnexus\app\admin\adminlist\page.tsx
"use server"
import client from '@/app/db'
import { JWTPayload } from 'jose'
import { DeleteJobInterface } from '@/interfaces/jobinterface'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
export interface AdminPayload extends JWTPayload {
  id: string,
  // email: string
  role: string
  canDeleteJob:boolean
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
    return [];
  }
}
export async function getidOfAdmin(): Promise<AdminPayload | null> {
  try {
    const cookiestore = cookies();
    const token = (await cookiestore).get("token")?.value;
    if (!token || token.split(".").length !== 3) return null;
    if (!process.env.SECRET_KEY) return null;
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify<AdminPayload>(token, secret);
    if (!payload.id || payload.role !== "admin") return null;
    console.log("payload candeltejob =- ",payload.canDeleteJob);
    return {
      id: payload.id,
      role: payload.role,
      canDeleteJob:payload.canDeleteJob
    };
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}
export async function deleteJob(jobId: string) {
  console.log("yes sir we are in")
  try {
    const admin = await getidOfAdmin();
    if (!admin) {
      return { success: false, msg: "you are not an admin!" }
    }
    const dbadmin = await client.admin.findUnique({
      where: {
        id: admin.id,
        
      }
    })
    if (!dbadmin || !dbadmin.canDeleteJob) {
      return { succes: false, msg: "permission denied,you cannot delete the jobs" }
    }
    const deleteRelation = await client.$transaction([
      client.$executeRaw`
        DELETE FROM "_UserTojobschema" 
        WHERE "B" = ${jobId}
      `,
      client.jobschema.delete({
        where: { id: jobId }
      })
    ]);
    if (deleteRelation.length < 0) {
      return { success: false, msg: "Failed to delete job-user links." };
    }
    revalidatePath('/admin/jobs');
    return { success: true, deletedJobId: jobId }
  } catch (err: any) {
    console.log("sorry we are fucced up and in the catch")
    console.log(err.message);
    return { success: false, msg: "It's not you it's us" }
  }
}