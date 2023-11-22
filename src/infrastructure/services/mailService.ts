"use strict";

const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport


export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure:parseInt(process.env.MAIL_PORT)===465 ? true : false , 
  service:process.env.MAIL_SERVICE,
  auth: {
    user:process.env.MAIL_USER, // generated ethereal user
    pass:process.env.MAIL_PASSWORD, // generated ethereal password
  }
});
