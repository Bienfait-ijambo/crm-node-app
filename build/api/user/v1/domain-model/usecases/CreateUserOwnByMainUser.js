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
exports.CreateUserOwnByMainUserUseCase = void 0;
const UserDomain_1 = require("../domain/UserDomain");
const EmailVerification_1 = require("../events/EmailVerification");
const CreateUserOwnByMainUser_1 = require("../domain/CreateUserOwnByMainUser");
const logger_1 = require("../../../../../infrastructure/graphql-server/winston/logger");
class CreateUserOwnByMainUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = CreateUserOwnByMainUser_1.CreateUserOwnByMainUser.createUserInput(input);
            const hash = yield UserDomain_1.UserDomain.hashPassword(input.password);
            dto.password = hash;
            const emailExist = yield this.repo.findUserByEmail(dto.email);
            if (emailExist)
                throw new Error(`Cette adresse mail existe déjà !`);
            const user = yield this.repo.createUser(dto);
            (0, EmailVerification_1.sendEmailVerification)(user.email, user.otpNumber).catch((error) => __awaiter(this, void 0, void 0, function* () {
                (0, logger_1.logErrorToFile)(error, 'Mail-error');
            }));
            return user;
        });
    }
}
exports.CreateUserOwnByMainUserUseCase = CreateUserOwnByMainUserUseCase;
//# sourceMappingURL=CreateUserOwnByMainUser.js.map