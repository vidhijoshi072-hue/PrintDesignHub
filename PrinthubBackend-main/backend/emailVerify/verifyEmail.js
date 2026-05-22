import nodemailer from 'nodemailer';
import 'dotenv/config';


export const verifyEmail =  (token, email) => {
    const verificationBaseUrl = (process.env.FRONTEND_URL || 'http://localhost:3000')
        .split(',')[0]
        .trim();

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
        subject: 'Email Verification - PrintDesignHUb',

        text: `Hi there! 

Welcome to PrintDesignHUb!

Please verify your email by clicking the link below:
${verificationBaseUrl}/verify/${token}

This link will expire in 20 minutes.

If you didn't create this account, please ignore this email.

Thanks,
PrintDesignHUb Team`
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
}


