"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailVerification = void 0;
const mailService_1 = require("../../../../../infrastructure/services/mailService");
// I called this method within Infrastructure/jobs
function sendEmailVerification(toEmail, otpNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        //   let testAccount = await nodemailer.createTestAccount();
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: toEmail,
            subject: 'Validation mot de passe',
            text: 'Veuillez copier le code suivant pour vérifier votre adresse e-mail:',
            html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            
            h2 {
              color: #0066cc;
              font-size: 20px;
            }
          </style>
        </head>
        <body>
          <p>Veuillez copier le code suivant pour vérifier votre adresse e-mail :</p>
          <h2>${otpNumber}</h2>
        </body>
      </html>
    `
        };
        const info = yield mailService_1.transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    });
}
exports.sendEmailVerification = sendEmailVerification;
//# sourceMappingURL=EmailVerification.js.map