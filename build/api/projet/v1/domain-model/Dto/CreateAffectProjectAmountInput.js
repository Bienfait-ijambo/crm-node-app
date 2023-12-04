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
exports.CreateAffectProjectAmountInput = void 0;
const Number_1 = require("../../../../common/customer-decorators/Number");
class CreateAffectProjectAmountInput {
    constructor(input) {
        this.paidAmount = 0;
        this.amount = input.amount;
        this.userId = input.userId;
        this.status = input.status;
        this.projectId = input.projectId;
        if (!this.isValidAmount())
            throw new Error('Montant doit etre superieure à zero');
    }
    isValidAmount() {
        if (parseFloat(this.amount) > 0) {
            return true;
        }
        return false;
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", String)
], CreateAffectProjectAmountInput.prototype, "amount", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateAffectProjectAmountInput.prototype, "userId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateAffectProjectAmountInput.prototype, "projectId", void 0);
exports.CreateAffectProjectAmountInput = CreateAffectProjectAmountInput;
//# sourceMappingURL=CreateAffectProjectAmountInput.js.map