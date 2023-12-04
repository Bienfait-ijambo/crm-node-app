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
exports.accountRepo = exports.TypeormAccountRepo = void 0;
const accountInterfaces_1 = require("../domain-model/usecases/interfaces/accountInterfaces");
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const Account_1 = require("../../../../entities/Account");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const AccountMapper_1 = require("./AccountMapper");
const AccountType_1 = require("../../../../entities/AccountType");
const Mass_1 = require("../../../../entities/Mass");
const AggregateAccountAmount_1 = require("../../../../entities/AggregateAccountAmount");
class TypeormAccountRepo {
    constructor() {
        this.db = new DB_1.DB(Account_1.Account);
    }
    createAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.save(input);
            return AccountMapper_1.AccountMapper.toDto(result);
        });
    }
    findAccountByCode(code, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(Account_1.Account)
                .createQueryBuilder('account')
                .where(`account.code = :accountCode`, { accountCode: code })
                .andWhere(`account.userId = :userId`, { userId: userId })
                .getOne();
            return result ? result : null;
        });
    }
    getAccounts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 8;
            let name = input.accountName.toLowerCase();
            const query = data_source_1.AppDataSource.getRepository(Account_1.Account)
                .createQueryBuilder("account")
                .leftJoinAndSelect("account.accountType", "accountType")
                .leftJoinAndSelect("account.mass", "mass");
            if (input.searchType === accountInterfaces_1.AccountSearchType.CODE) {
                query.where("account.code LIKE :accountCode", { accountCode: `%${input.code}%` });
            }
            if (input.searchType === accountInterfaces_1.AccountSearchType.TEXT) {
                query.where("lower(account.name) LIKE :accountName", { accountName: `%${name}%` });
            }
            const [accounts, count] = yield query.andWhere('(account.userId = :userId OR account.userId = :defaultUserId)', {
                userId: input.userId,
                defaultUserId: Account_1.defaultUserId.userId
            })
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { accounts, count, totalPages };
        });
    }
    /**
     *
     * @param input
     * @returns input
     * checks update an account in accountTable and remove an account in aggregate-accountTable if doesnt satisfy the condition
     */
    updateAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.update({
                name: input.name,
                code: input.code,
                accountTypeId: input.typeId,
                massId: input.massId,
            }, input.id);
            if (input.typeId !== AccountType_1.enumAccountType.ACTIF && input.massId !== Mass_1.enumMassType.TRESORERIE_ACTIF) {
                //remove account from aggregate_account_table
                this.removeAccountFromAggregateAccountTable(input.id);
            }
            if (!result)
                throw new Error("Désolez, nous n'avons pas trouvé ce code !");
            return input;
        });
    }
    removeAccountFromAggregateAccountTable(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder()
                .delete()
                .from(AggregateAccountAmount_1.AggregateAccountAmount)
                .where("accountId = :accountId", { accountId: accountId })
                .execute();
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Account_1.Account]),
    __metadata("design:returntype", Promise)
], TypeormAccountRepo.prototype, "createAccount", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TypeormAccountRepo.prototype, "findAccountByCode", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormAccountRepo.prototype, "getAccounts", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormAccountRepo.prototype, "updateAccount", null);
exports.TypeormAccountRepo = TypeormAccountRepo;
exports.accountRepo = new TypeormAccountRepo();
//# sourceMappingURL=TypeormAccountRepo.js.map