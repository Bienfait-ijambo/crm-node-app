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
exports.CreateAccountInput = void 0;
const Account_1 = require("../../../../../entities/Account");
const Number_1 = require("../../../../common/customer-decorators/Number");
const Required_1 = require("../../../../common/customer-decorators/Required");
class CreateAccountInput {
    constructor(input) {
        this.typeId = input.typeId;
        this.massId = input.massId;
        this.userId = input.userId;
        this.name = input.name;
        this.code = input.code;
    }
    getInput() {
        return new Account_1.Account(this.name, this.code, this.massId, this.typeId, Account_1.AccountStatus.ACTIVE, this.userId);
    }
}
__decorate([
    (0, Required_1.Required)(4, 100),
    __metadata("design:type", String)
], CreateAccountInput.prototype, "name", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", String)
], CreateAccountInput.prototype, "code", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateAccountInput.prototype, "typeId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateAccountInput.prototype, "massId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateAccountInput.prototype, "userId", void 0);
exports.CreateAccountInput = CreateAccountInput;
//# sourceMappingURL=CreateAccountInput.js.map