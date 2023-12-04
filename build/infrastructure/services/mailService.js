"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: parseInt(process.env.MAIL_PORT) === 465 ? true : false,
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    }
});
//# sourceMappingURL=mailService.js.map