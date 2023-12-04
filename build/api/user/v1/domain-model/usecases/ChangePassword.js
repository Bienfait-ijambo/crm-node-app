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
exports.ChangePasswordUseCase = void 0;
const UserPassword_1 = require("../domain/UserPassword");
class ChangePasswordUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.newPassword !== input.passwordConfirm)
                throw new Error("Veuillez entre le mot de passe identique !");
            const hashNewPassword = yield UserPassword_1.UserPassword.hashPassword(input.newPassword);
            input.newPassword = hashNewPassword;
            const result = yield this.repo.updatePassword(input);
            if (result)
                return { message: "Mot de passe modifier avec succès !" };
        });
    }
}
exports.ChangePasswordUseCase = ChangePasswordUseCase;
//# sourceMappingURL=ChangePassword.js.map