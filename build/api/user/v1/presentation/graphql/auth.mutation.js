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
exports.authMutations = void 0;
const TypeormUserRepo_1 = require("../../repository/TypeormUserRepo");
const LoginUser_1 = require("../../domain-model/auth/login/LoginUser");
const Jwt_1 = require("../../../../../middleware/Jwt");
exports.authMutations = {
    Mutation: {
        loginUser: (root, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const usecase = new LoginUser_1.LoginUserUseCase(TypeormUserRepo_1.userRepo);
            const result = yield usecase.execute(input);
            return result;
        }),
        loginUserViaOAuth: (root, { userProviderId }) => __awaiter(void 0, void 0, void 0, function* () {
            const usecase = new LoginUser_1.LoginUserUseCase(TypeormUserRepo_1.userRepo);
            const result = yield usecase.loginUserViaOAuth(userProviderId);
            return result;
        }),
        getTokens: (root, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            const payload = yield Jwt_1.JwtToken.verifyRefreshToken(token);
            const accessToken = yield Jwt_1.JwtToken.signAccessToken(payload.aud.toString());
            const refreshToken = yield Jwt_1.JwtToken.signRefreshToken(payload.aud.toString());
            return { accessToken, refreshToken };
        }),
    }
};
//# sourceMappingURL=auth.mutation.js.map