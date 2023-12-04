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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const Required_1 = require("../customer-decorators/Required");
class Email {
    /**
     *
     * @param email {string}
     */
    constructor(email) {
        this.emailIsVerified = false;
        this.email = email;
        if (!this.isValid())
            throw new Error("Invalid email address ");
    }
    /**
     *
     * @returns {boolean} if is a valid email
     */
    isValid() {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isValid = regex.test(this.email);
        return isValid ? true : false;
    }
    getEmail() {
        return this.email.toLocaleLowerCase();
    }
}
__decorate([
    (0, Required_1.Required)(10, 30),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
exports.Email = Email;
//# sourceMappingURL=Email.js.map