import nodemailer from 'nodemailer';
import 'dotenv/config';


export const sendOTPEmail =  async (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {

        from: process.env.MAIL_USER,

        to: email,
        subject: 'password reset OTP',
        html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('OTP Sent Successfully');
        console.log(info);
    });
}
