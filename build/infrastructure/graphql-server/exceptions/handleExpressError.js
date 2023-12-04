"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExpressError = void 0;
const handleExpressError = (err, req, res, next) => {
    // Check if the error is an authentication-related error
    if (err) {
        // Handle the authentication error here
        if (err.name == "AuthorizationError") {
            const clientUrl = process.env.CLIENT_URL;
            return res.redirect(`${clientUrl}`);
        }
        else {
            return res.status(500).json({ error: err.name, message: "Express error, check it out Ben !" });
        }
    }
    next(err);
};
exports.handleExpressError = handleExpressError;
//# sourceMappingURL=handleExpressError.js.map