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
const TypeormUserRepo_1 = require("../../../repository/TypeormUserRepo");
const CreateUser_1 = require("../../usecases/CreateUser");
const getLinkedStrategyData_1 = require("./helper/getLinkedStrategyData");
const passportLinkenIn = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
passportLinkenIn.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
    scope: ["r_emailaddress", "r_liteprofile"],
    state: process.env.NODE_ENV === 'production' ? true : false //handle csrf attack
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const linkedInput = (0, getLinkedStrategyData_1.getLinkedStrategyData)(profile);
                const useCase = new CreateUser_1.CreateUserUseCase(TypeormUserRepo_1.userRepo);
                const randomIdPlusOAuthProviderId = yield useCase.createUserViaPassportStrategies(linkedInput);
                return done(null, randomIdPlusOAuthProviderId);
            }
            catch (error) {
                return done(null, "ERROR");
            }
        });
    });
}));
passportLinkenIn.serializeUser((user, done) => {
    done(null, user);
});
passportLinkenIn.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passportLinkenIn;
//# sourceMappingURL=LinkedInStrategy.js.map