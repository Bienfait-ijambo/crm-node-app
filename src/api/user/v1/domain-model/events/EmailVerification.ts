
"use strict";

import { logErrorToFile } from "../../../../../infrastructure/graphql-server/winston/logger";
import { transporter } from "../../../../../infrastructure/services/mailService";



// I called this method within Infrastructure/jobs
export async function sendEmailVerification(toEmail:string,otpNumber:string) {

  
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



  const info = await transporter.sendMail(mailOptions);


  console.log("Message sent: %s", info.messageId);

}





