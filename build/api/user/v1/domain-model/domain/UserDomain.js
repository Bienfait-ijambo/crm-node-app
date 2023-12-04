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
exports.UserDomain = void 0;
const User_1 = require("../../../../../entities/User");
const generateOpt_1 = require("../../../../../shared/util/generateOpt");
const Email_1 = require("../../../../common/domain/Email");
const Telephone_1 = require("../../../../common/domain/Telephone");
const Role_1 = require("./Role");
const UserName_1 = require("./UserName");
const UserPassword_1 = require("./UserPassword");
const generateUserCode_1 = require("./generateUserCode");
class UserDomain {
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield UserPassword_1.UserPassword.hashPassword(password);
            return hashPassword;
        });
    }
    static createUserInput(input) {
        const email = new Email_1.Email(input.email);
        const userCode = (0, generateUserCode_1.generateUserCode)(email.getEmail());
        const otp = (0, generateOpt_1.generateOTP)(6);
        const userProviderId = '';
        const emailIsVerified = true;
        return new User_1.User('-', email.getEmail(), Role_1.userRole.OWNER, '', input.password, userCode, otp, emailIsVerified, input.terms, User_1.OWNER_USER.id, userProviderId);
    }
    static uploadUserImageInput(input) {
        const email = new Email_1.Email(input.email);
        return {
            email: email.getEmail(),
            image: input.image,
        };
    }
    static updateUserInput(input) {
        const userName = new UserName_1.UserName(input.userName);
        const telephone = new Telephone_1.Telephone(input.telephone);
        const email = new Email_1.Email(input.email);
        return {
            userName: userName.getUserName(),
            telephone: telephone.getTelephone(),
            email: email.getEmail()
        };
    }
}
exports.UserDomain = UserDomain;
//# sourceMappingURL=UserDomain.js.map