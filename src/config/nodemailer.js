import nodemailer from "nodemailer";
import "dotenv/config.js";

const nodemailerPort = parseInt(process.env.NODEMAILER_PORT, 10);
const nodemailerHost = process.env.NODEMAILER_HOST;
const nodemailerUser = process.env.NODEMAILER_USER;
const nodemailerPass = process.env.NODEMAILER_PASS;

const transporter = nodemailer.createTransport({
  host: nodemailerHost,
  port: nodemailerPort,
  secure: nodemailerPort === 465,
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    return await transporter.sendMail({ to, subject, html });
  } catch (error) {
    console.error(`Email failed to be sent to ${to} due: `, error);
    throw error;
  }
};

export default sendEmail;
