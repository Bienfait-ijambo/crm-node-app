"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOAuthInput = void 0;
const User_1 = require("../../../../../entities/User");
const Role_1 = require("./Role");
const generateUserCode_1 = require("./generateUserCode");
class CreateOAuthInput {
    static getInput(input) {
        const userCode = (0, generateUserCode_1.generateUserCode)(input.email);
        const otp = "";
        return new User_1.User(input.userName, input.email, Role_1.userRole.OWNER, input.image, input.password, userCode, otp, input.emailIsVerified, input.terms, User_1.OWNER_USER.id, input.userProviderId);
    }
    static generateUserCode() {
        const timestamp = Date.now();
    }
}
exports.CreateOAuthInput = CreateOAuthInput;
//# sourceMappingURL=CreateOAuthInput.js.map