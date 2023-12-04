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
exports.Journal = exports.journalTransaction = exports.JournalTransactionType = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
const Project_1 = require("./Project");
const Service_1 = require("./Service");
/**
 * Transaction can be debit or credit
 */
var JournalTransactionType;
(function (JournalTransactionType) {
    JournalTransactionType[JournalTransactionType["DEBIT"] = 1] = "DEBIT";
    JournalTransactionType[JournalTransactionType["CREDIT"] = 2] = "CREDIT";
})(JournalTransactionType = exports.JournalTransactionType || (exports.JournalTransactionType = {}));
exports.journalTransaction = [
    {
        name: 'DEBIT',
        val: 1,
    },
    {
        name: 'CREDIT',
        val: 2,
    },
];
let Journal = class Journal {
    constructor(accountId, description, projectId, serviceId, amount, transactionType, income, expense, draw, userId) {
        this.accountId = accountId;
        this.description = description;
        this.projectId = projectId;
        this.serviceId = serviceId;
        this.amount = amount;
        this.transactionType = transactionType;
        this.income = income;
        this.transactionType = transactionType;
        this.expense = expense;
        this.userId = userId;
        this.draw = draw;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Journal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Journal.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], Journal.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], Journal.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journal.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Journal.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journal.prototype, "income", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journal.prototype, "expense", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Journal.prototype, "draw", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Journal.prototype, "transactionCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Journal.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Journal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Journal.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Journal.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (account) => account.journals),
    __metadata("design:type", Account_1.Account)
], Journal.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Project_1.Project),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Journal.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Service_1.Service),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Journal.prototype, "services", void 0);
Journal = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, String, Number, Number, String, Number, String, String, Boolean, Number])
], Journal);
exports.Journal = Journal;
//# sourceMappingURL=Journal.js.map