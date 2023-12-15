import nodemailer from "nodemailer";
import "dotenv/config";

export const configureNodemailer = async () => {
  const nodemailerConfig = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_OTP_HOST_EMAIL,
      pass: process.env.NODEMAILER_OTP_HOST_PASSWORD,
    },
  };

  const nodemailerTransporter = nodemailer.createTransport(nodemailerConfig);

  return nodemailerTransporter;
};
