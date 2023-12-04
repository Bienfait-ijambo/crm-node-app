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
exports.Account = exports.defaultUserId = exports.AccountStatus = void 0;
const typeorm_1 = require("typeorm");
const AccountType_1 = require("./AccountType");
const Mass_1 = require("./Mass");
const Journal_1 = require("./Journal");
var AccountStatus;
(function (AccountStatus) {
    AccountStatus[AccountStatus["ACTIVE"] = 1] = "ACTIVE";
    AccountStatus[AccountStatus["IN_ACTIVE"] = 0] = "IN_ACTIVE";
})(AccountStatus = exports.AccountStatus || (exports.AccountStatus = {}));
var defaultUserId;
(function (defaultUserId) {
    defaultUserId[defaultUserId["userId"] = 0] = "userId";
})(defaultUserId = exports.defaultUserId || (exports.defaultUserId = {}));
let Account = class Account {
    constructor(name, code, massId, accountTypeId, status, userId) {
        this.name = name;
        this.code = code;
        this.massId = massId;
        this.status = status;
        this.accountTypeId = accountTypeId;
        this.userId = userId;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ fulltext: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "accountTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "massId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], Account.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Account.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AccountType_1.AccountType, accountType => accountType.accounts),
    __metadata("design:type", AccountType_1.AccountType)
], Account.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Mass_1.Mass, mass => mass.account),
    __metadata("design:type", Mass_1.Mass)
], Account.prototype, "mass", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Journal_1.Journal, (journal) => journal.account),
    __metadata("design:type", Array)
], Account.prototype, "journals", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, Number, Number, Number, Number])
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map