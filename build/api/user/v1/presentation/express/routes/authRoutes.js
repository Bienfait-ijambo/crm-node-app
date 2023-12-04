"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GoogleStrategy_1 = __importDefault(require("../../../domain-model/auth/login/GoogleStrategy"));
const LinkedInStrategy_1 = __importDefault(require("../../../domain-model/auth/login/LinkedInStrategy"));
const authRouter = express_1.default.Router();
/* --------------------------------------------------------------------------------Google login route
* --------------------------------------------------------------------------------------------------
*/
authRouter.get('/google', GoogleStrategy_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Google callback route
authRouter.get('/google/callback', GoogleStrategy_1.default.authenticate('google', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login' // to add login redirect
}));
/* -------------------------------------------------------------------------------------------------
* --------------------------------------------------------------------------------------------------
*/
authRouter.get('/linkedin', LinkedInStrategy_1.default.authenticate('linkedin', { state: 'SOME STATE' }), function (req, res) {
});
authRouter.get('/linkedin/callback', LinkedInStrategy_1.default.authenticate('linkedin', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/login' // to add login redirect
}));
authRouter.get('/dashboard', (req, res, next) => {
    var _a;
    const clientUrl = process.env.CLIENT_URL;
    const sessionData = req === null || req === void 0 ? void 0 : req.session;
    const userProviderId = (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.passport) === null || _a === void 0 ? void 0 : _a.user;
    if (typeof userProviderId !== 'undefined') {
        if (userProviderId != 'ERROR') {
            res.redirect(`${clientUrl}oAuthData/${userProviderId}`);
        }
        else {
            res.status(401).send({ message: "STR__ERROR__::" });
        }
    }
    else {
        res.status(401).send({ message: "unauthorized" });
    }
});
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map