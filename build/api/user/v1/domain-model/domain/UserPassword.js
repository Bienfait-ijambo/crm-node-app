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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserPassword {
    /**
     *
     * @param password {password provide by the user}
     * @param hashPassword
     * @returns boolean
     */
    static verifyPassword(password, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcrypt_1.default.compare(password, hashPassword);
            return (isMatch) ? true : false;
        });
    }
    /**
     *
     * @param password
     * @returns a hash password
     */
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pwdLenth = 8;
            if (typeof password === 'undefined' || password === '')
                throw new Error('Veuillez entre le mot de passe !');
            if (password.length < pwdLenth)
                throw new Error("Veuillez entre 8 charactères au minimum [Password] !");
            if (!UserPassword.isValidatePwd(password))
                throw new Error('Pwd Invalide : [4 chiffres, 2 Lettre en majuscule, 2 Lettre en miniscule]');
            const hash = yield bcrypt_1.default.hash(password, 10);
            return hash;
        });
    }
    static isValidatePwd(password) {
        const passwordRegex = /^(?=.*\d{4})(?=.*[a-z]{2})(?=.*[A-Z]{2}).{8,}$/;
        return (passwordRegex.test(password)) ? true : false;
    }
}
exports.UserPassword = UserPassword;
//# sourceMappingURL=UserPassword.js.map