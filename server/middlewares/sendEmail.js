const nodemailer = require("nodemailer");

exports.sendEmail = async (details) => {
    const transporter = nodemailer.createTransport({

        // SMPT: Simple Mail Transfer Protocol
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
        service = process.env.SMPT_SERVICE
    });
    const mailOptions = {
        from: "",
        to: details.email,
        subject: details.subject,
        text: details.message
    }
    await transporter.sendMail(mailOptions)
}