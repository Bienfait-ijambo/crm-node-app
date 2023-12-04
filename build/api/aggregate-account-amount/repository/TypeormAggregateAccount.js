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
exports.aggregateAccountRepo = exports.TypeormAggregateAccount = void 0;
const AccountType_1 = require("../../../entities/AccountType");
const AggregateAccountAmount_1 = require("../../../entities/AggregateAccountAmount");
const Mass_1 = require("../../../entities/Mass");
const data_source_1 = require("../../../infrastructure/typeorm/data-source");
const CachError_1 = require("../../../shared/exceptions/CachError");
class TypeormAggregateAccount {
    recordData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into(AggregateAccountAmount_1.AggregateAccountAmount)
                .values(input)
                .execute();
            return result;
        });
    }
    checkIfAccountExists(accountId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(AggregateAccountAmount_1.AggregateAccountAmount)
                .createQueryBuilder("aggregate_account_amount")
                .addSelect("aggregate_account_amount.id", "id")
                .addSelect("aggregate_account_amount.totalAmount", "totalAmount")
                .addSelect("aggregate_account_amount.userId", "userId")
                .addSelect("aggregate_account_amount.accountId", "accountId")
                .where("aggregate_account_amount.accountId IN(:...accountIds)", {
                accountIds: accountId,
            })
                .andWhere("aggregate_account_amount.userId = :userId", { userId: userId })
                .getRawMany();
            return result;
        });
    }
    updateData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder()
                .update(AggregateAccountAmount_1.AggregateAccountAmount)
                .set({ totalAmount: input.totalAmount })
                .where("id = :id", { id: input.id })
                .andWhere("accountId = :accountId", { accountId: input.accountId })
                .andWhere("userId = :userId", { userId: input.userId })
                .execute();
        });
    }
    getTreasuryAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(AggregateAccountAmount_1.AggregateAccountAmount)
                .createQueryBuilder("aggregate_account_amount")
                .leftJoinAndSelect('aggregate_account_amount.account', 'account')
                .select([
                "account.name AS accountname",
                "account.code AS accountcode",
                "aggregate_account_amount.totalAmount AS totalamount",
            ])
                .where("account.massId = :massId", { massId: Mass_1.enumMassType.TRESORERIE_ACTIF })
                .andWhere("account.accountTypeId = :accountTypeId", { accountTypeId: AccountType_1.enumAccountType.ACTIF })
                .andWhere("aggregate_account_amount.userId = :userId", { userId: input.userId })
                .getRawMany();
            return result;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TypeormAggregateAccount.prototype, "recordData", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", Promise)
], TypeormAggregateAccount.prototype, "checkIfAccountExists", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormAggregateAccount.prototype, "updateData", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormAggregateAccount.prototype, "getTreasuryAccount", null);
exports.TypeormAggregateAccount = TypeormAggregateAccount;
exports.aggregateAccountRepo = new TypeormAggregateAccount();
//# sourceMappingURL=TypeormAggregateAccount.js.map