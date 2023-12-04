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
const getGoogleStrategyData_1 = require("./helper/getGoogleStrategyData");
const passportGoogle = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passportGoogle.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL,
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const googleInput = (0, getGoogleStrategyData_1.getGoogleStrategyData)(profile);
            const useCase = new CreateUser_1.CreateUserUseCase(TypeormUserRepo_1.userRepo);
            const randomIdPlusOAuthProviderId = yield useCase.createUserViaPassportStrategies(googleInput);
            return cb(null, randomIdPlusOAuthProviderId);
        }
        catch (error) {
            return cb(null, "ERROR");
        }
    });
}));
passportGoogle.serializeUser((user, done) => {
    done(null, user);
});
passportGoogle.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passportGoogle;
//# sourceMappingURL=GoogleStrategy.js.map