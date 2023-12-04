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
exports.AggregateAccountAmount = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
let AggregateAccountAmount = class AggregateAccountAmount {
    constructor(accountId, accountType, totalAmount, userId) {
        this.accountId = accountId;
        this.totalAmount = totalAmount;
        this.userId = userId;
        this.accountType = accountType;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AggregateAccountAmount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({ unique: false }),
    __metadata("design:type", Number)
], AggregateAccountAmount.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], AggregateAccountAmount.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AggregateAccountAmount.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AggregateAccountAmount.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AggregateAccountAmount.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AggregateAccountAmount.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AggregateAccountAmount.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Account_1.Account),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Account_1.Account)
], AggregateAccountAmount.prototype, "account", void 0);
AggregateAccountAmount = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, Number, String, Number])
], AggregateAccountAmount);
exports.AggregateAccountAmount = AggregateAccountAmount;
//# sourceMappingURL=AggregateAccountAmount.js.map