'use server'
import nodemailer from 'nodemailer';

export async function sendEmail(to: string, Jobtitle: string,) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
    const mailoption = {
        from: process.env.EMAIL,
        to,
        subject: `${Jobtitle}`,
        html: `
       <div style="font-family: sans-serif; padding: 20px; background-color: #f9fafb; color: #111">
        <h2 style="color: #111111;"> New Job Posted on <span style="color:#1f2937;">HiringNexus</span></h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">We’re excited to share that a new job has just been posted!</p>
        <ul style="font-size: 16px; line-height: 1.6;">
          <li><strong>Job Title:</strong> ${Jobtitle}</li>
          <li><strong>Type:</strong> Full-time</li>
        </ul>
        <p>
          <a href="https://your-frontend-link.com" 
             style="display: inline-block; margin-top: 12px; padding: 10px 20px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Visit HiringNexus
          </a>
        </p>
        <p style="margin-top: 20px; font-size: 14px; color: #4b5563;">
          Thanks,<br/>
          — The HiringNexus Team
        </p>
    </div>
    `,
    }
    try {
        await transporter.sendMail(mailoption);
    } catch (e: any) {
        console.log(e.message);
    }
}
