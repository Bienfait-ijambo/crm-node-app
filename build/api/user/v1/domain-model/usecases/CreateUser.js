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
exports.CreateUserUseCase = void 0;
const UserDomain_1 = require("../domain/UserDomain");
const Role_1 = require("../domain/Role");
const CreateOAuthInput_1 = require("../domain/CreateOAuthInput");
const generateOpt_1 = require("../../../../../shared/util/generateOpt");
class CreateUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDomain = UserDomain_1.UserDomain.createUserInput(input);
            const [hash, userEmailExist] = yield Promise.all([
                UserDomain_1.UserDomain.hashPassword(input.password),
                this.repo.findUserByEmail(userDomain.email)
            ]);
            userDomain.password = hash;
            if (userEmailExist)
                throw new Error(`Cette adresse mail existe déjà !`);
            const user = yield this.repo.createUser(userDomain);
            return user;
        });
    }
    /**
     *
     * @param loginData
     * LinkedIn,Facebook,Google
     */
    createUserViaPassportStrategies(strategyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomIdPlusOAuthProviderId = this.createUserProviderId(strategyData.id);
            const input = {
                email: strategyData.email,
                userName: strategyData.displayName,
                password: "",
                role: Role_1.userRole.OWNER,
                terms: true,
                image: strategyData.photo,
                userProviderId: randomIdPlusOAuthProviderId,
                emailIsVerified: true,
            };
            const userInput = CreateOAuthInput_1.CreateOAuthInput.getInput(input);
            const user = yield this.repo.findUserByEmail(userInput.email);
            if (user) {
                yield this.repo.updateUserProviderId(user.id, randomIdPlusOAuthProviderId);
                return randomIdPlusOAuthProviderId;
                //update
            }
            else {
                //create user and logged in
                yield this.repo.createUser(userInput);
                return randomIdPlusOAuthProviderId;
            }
        });
    }
    createUserProviderId(userProviderId) {
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 1000000);
        const randomCode = (0, generateOpt_1.generateOTP)(6);
        return `${timestamp}-${randomNumber}-${userProviderId}-${randomCode}`;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUser.js.map