"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserOwnByMainUser = void 0;
const User_1 = require("../../../../../entities/User");
const Email_1 = require("../../../../common/domain/Email");
const ID_1 = require("../../../../common/domain/ID");
const Role_1 = require("./Role");
const generateUserCode_1 = require("./generateUserCode");
class CreateUserOwnByMainUser {
    static createUserInput(input) {
        // const buildEmail=CreateUserOwnByMainUser.buildUserEmail(input)
        const email = new Email_1.Email(input.email);
        const role = new Role_1.Role(input.role);
        const userCode = (0, generateUserCode_1.generateUserCode)(email.getEmail());
        const ownByUserId = new ID_1.ID(input.ownByUserId);
        const emailIsVerified = false;
        return new User_1.User("-", email.getEmail(), role.getRole(), "", input.password, input.userCode, userCode, emailIsVerified, input.terms, ownByUserId.getId(), "");
    }
}
exports.CreateUserOwnByMainUser = CreateUserOwnByMainUser;
//# sourceMappingURL=CreateUserOwnByMainUser.js.map