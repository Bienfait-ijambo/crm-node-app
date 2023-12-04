"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.VerifyLoginInput = void 0;
const Email_1 = require("../../../../../common/domain/Email");
const Telephone_1 = require("../../../../../common/domain/Telephone");
const UserPassword_1 = require("../../domain/UserPassword");
const userInterfaces_1 = require("../../usecases/interfaces/userInterfaces");
const IsValidLoginInputType_1 = require("./IsValidLoginInputType");
class VerifyLoginInput {
    /**
     *
     * @param loginDto
     */
    constructor(input) {
        this.loginInputType = input.loginByInputType;
        if (input.loginByInputType.toUpperCase() === userInterfaces_1.LoginByInputType.EMAIL) {
            this.email = new Email_1.Email(input.email);
            this.password = input.password;
        }
        if (input.loginByInputType.toUpperCase() === userInterfaces_1.LoginByInputType.TELEPHONE) {
            this.telephone = new Telephone_1.Telephone(input.telephone);
            this.password = input.password;
        }
    }
    /**
     *
     * @param hashPassword
     */
    verifyPassword(hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield UserPassword_1.UserPassword.verifyPassword(this.password, hashPassword);
            return isMatch ? true : false;
        });
    }
}
__decorate([
    IsValidLoginInputType_1.IsValidLoginInputType,
    __metadata("design:type", String)
], VerifyLoginInput.prototype, "loginInputType", void 0);
exports.VerifyLoginInput = VerifyLoginInput;
//# sourceMappingURL=VerifyLoginInput.js.map