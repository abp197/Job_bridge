import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use another service like 'Outlook', 'SendGrid', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS,  // Your email password or application-specific password
    },
});

// Function to send an email
export const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};
