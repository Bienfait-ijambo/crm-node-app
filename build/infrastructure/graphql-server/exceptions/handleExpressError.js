"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExpressError = void 0;
// export const handleExpressError =  (error, req, res, next) => {
//   // Check if the error is an authentication-related error
//   if (error) {
//     // // Handle the authentication error here
//     // if (err.name == "AuthorizationError") {
//     //   const clientUrl = process.env.CLIENT_URL;
//     //  return res.redirect(`${clientUrl}`);
//     // } else {
//     //   return res.status(500).json({ error: err.name ,message:"Express error, check it out Ben !"});
//     // }
//     res.status(error.status).send({
//       error: {
//         message: error.message,
//         status: error.status,
//       },
//     });
//   }
//   // next(error);
// };
// errorMiddleware.js
function handleExpressError(err, req, res, next) {
    // Set a default status code if it's not already set
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
        },
    });
}
exports.handleExpressError = handleExpressError;
;
//# sourceMappingURL=handleExpressError.js.map