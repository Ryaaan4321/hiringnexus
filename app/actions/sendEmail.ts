'use server'
import nodemailer from 'nodemailer';

export async function sendEmail(to: string, Jobtitle: string,) {
    console.log("sendemail function got called");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })
    console.log("email from the sendemail funcc = ", process.env.EMAIL);
    console.log("email password from the senemail funccc = ", process.env.EMAIL_PASS)
    const mailoption = {
        from: process.env.EMAIL,
        to,
        subject: `${Jobtitle}`,
        text: `hmlo hmlo we are fucking up in hiring nexus`
    }
    try {
        await transporter.sendMail(mailoption);
    } catch (e: any) {
        console.log(e.message);
    }
}
