import nodemailer from "nodemailer";
import "dotenv/config.js";

const nodemailerUser = process.env.NODEMAILER_USER;
const nodemailerPass = process.env.NODEMAILER_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
});

const sendEmail = async (to, subject, content) => {
  try {
    const response = await transporter.sendMail({
      to: to,
      subject: subject,
      html: content,
    });
    console.log(`Email successfully sent to ${to}`);
    return response;
  } catch (error) {
    console.error(`Email failed to be sent to ${to} due: `, error);
  }
};

export default sendEmail;
