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
exports.LoginUserUseCase = void 0;
const SuccessLoginResponse_1 = require("../common/responses/SuccessLoginResponse");
const UserEmailNotVerified_1 = require("../common/responses/UserEmailNotVerified");
const VerifyLoginInput_1 = require("../validation/VerifyLoginInput");
const Jwt_1 = require("../../../../../../middleware/Jwt");
const User_1 = require("../../../../../../entities/User");
const EmailVerification_1 = require("../../events/EmailVerification");
const TypeormUserRepo_1 = require("../../../repository/TypeormUserRepo");
const GetUserEnterpiseInfo_1 = require("../../usecases/GetUserEnterpiseInfo");
const CreateLoginError_1 = require("../common/errors/CreateLoginError");
const logger_1 = require("../../../../../../infrastructure/graphql-server/winston/logger");
const CreateUserBlockedError_1 = require("../common/errors/CreateUserBlockedError");
class LoginUserUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginInput = new VerifyLoginInput_1.VerifyLoginInput(input);
            let user = yield this.repo.findUserByEmail(input.email);
            if (!user)
                throw new CreateLoginError_1.CreateLoginError();
            if (user.userIsBlocked)
                throw new CreateUserBlockedError_1.CreateUserBlockedError();
            const isValidPwd = yield loginInput.verifyPassword(user.password);
            if (!isValidPwd)
                throw new CreateLoginError_1.CreateLoginError();
            const emailIsValid = yield this.isUserMailValid(user);
            if (emailIsValid)
                return (0, UserEmailNotVerified_1.UserEmailNotVerified)();
            const loginData = yield this.getReturnedUserLogInData(user);
            return loginData;
        });
    }
    isUserMailValid(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.emailIsVerified) {
                yield (0, EmailVerification_1.sendEmailVerification)(user.email, user.otpNumber).catch((error) => (0, logger_1.logErrorToFile)(error, 'Mail-error'));
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     *
     * Login user via Google, Facebook,LinkedIn
     */
    loginUserViaOAuth(userProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginUseCase = new LoginUserUseCase(TypeormUserRepo_1.userRepo);
            const userEmailExist = yield this.repo.findUserByProviderId(userProviderId);
            if (userEmailExist.userIsBlocked)
                throw new CreateUserBlockedError_1.CreateUserBlockedError();
            if (userEmailExist) {
                //return token
                const loginData = yield loginUseCase.getReturnedUserLogInData(userEmailExist);
                return loginData;
            }
            else {
                throw new Error("Invalid user !");
            }
        });
    }
    getReturnedUserLogInData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userIsOwnByMainUser(user);
            const { accessToken, refreshToken } = yield this.getUserTokens(user);
            const enterpriseInfo = yield this.getUserEnterpiseInfo(user);
            const response = (0, SuccessLoginResponse_1.successLoginResponse)();
            const permissions = user.userpermissions;
            return {
                response: response,
                user: user,
                permissions: Array.isArray(permissions) ? permissions : null,
                enterpriseInfo: enterpriseInfo,
                tokens: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            };
        });
    }
    /**
     *
     * @param user
     * @returns accessToken and refreshToken
     */
    getUserTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = user.id.toString();
            const [accessToken, refreshToken] = yield Promise.all([
                Jwt_1.JwtToken.signAccessToken(userId),
                Jwt_1.JwtToken.signRefreshToken(userId)
            ]);
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    /**
     *
     * @param user
     * check if the user was created by a user with role owner
     * if true the created user will use the ownId to access its data
     */
    userIsOwnByMainUser(user) {
        user.ownByUserId > User_1.OWNER_USER.id ? (user.id = user.ownByUserId) : "";
    }
    getUserEnterpiseInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = user.ownByUserId === User_1.OWNER_USER.id ? user.id : user.ownByUserId;
            const useCase = new GetUserEnterpiseInfo_1.GetUserEnterpriseInfoUseCase(TypeormUserRepo_1.userRepo);
            const result = yield useCase.execute(userId);
            return result;
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
//# sourceMappingURL=LoginUser.js.map