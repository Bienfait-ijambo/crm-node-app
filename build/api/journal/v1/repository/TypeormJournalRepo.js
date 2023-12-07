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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.journalRepo = exports.TypeormJournalRepo = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const Journal_1 = require("../../../../entities/Journal");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const Mass_1 = require("../../../../entities/Mass");
const util_1 = require("../../../../shared/util/util");
const Account_1 = require("../../../../entities/Account");
class TypeormJournalRepo {
    constructor() {
        this.db = new DB_1.DB(Journal_1.Journal);
    }
    recordTransaction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into(Journal_1.Journal)
                .values(input)
                .execute();
            return result;
        });
    }
    saveIntoJournalService(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into("journal_services_service")
                .values({
                journalId: input.journalId,
                serviceId: input.serviceId,
            })
                .execute();
        });
    }
    getGeneralLedger(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            const result = yield data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .leftJoinAndSelect("journal.account", "account")
                .select("SUM(CAST(journal.amount AS FLOAT))", "totalAmount")
                .addSelect("journal.transactionType", "transactionType")
                .addSelect("journal.accountId", "accountId")
                .addSelect("account.name", "accountName")
                .addSelect("account.code", "accountCode")
                .groupBy("journal.transactionType")
                .addGroupBy("journal.accountId")
                .addGroupBy("account.name")
                .addGroupBy("account.code")
                .having("SUM(CAST(journal.amount AS FLOAT)) > 0")
                .where("journal.accountId IN(:...accountIds)", {
                accountIds: input.accountId,
            })
                .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getRawMany();
            return result;
        });
    }
    countDataInjournal(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .select("COUNT(journal.id)", "count")
                .groupBy("journal.accountId, journal.userId")
                .having("SUM(CAST(journal.amount AS FLOAT)) > 0")
                .where("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .getRawMany();
            return result.length > 0 ? result.length : 0;
        });
    }
    getBalance(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            const result = yield data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .leftJoinAndSelect("journal.account", "account")
                .leftJoinAndSelect("account.accountType", "accountType")
                .leftJoinAndSelect("account.mass", "mass")
                .select("SUM(CAST(journal.amount AS FLOAT))", "totalAmount")
                .addSelect("SUM(CAST(journal.income AS FLOAT))", "totalIncome")
                .addSelect("SUM(CAST(journal.expense AS FLOAT))", "totalExpense")
                .addSelect("journal.accountId", "accountId")
                .addSelect("account.name", "accountName")
                .addSelect("account.code", "accountCode")
                .addSelect("journal.userId", "userId")
                .addSelect("accountType.name", "accountType")
                .addSelect("mass.name", "massName")
                .groupBy("journal.accountId")
                .addGroupBy("journal.userId")
                .addGroupBy("account.name")
                .addGroupBy("account.code")
                .addGroupBy("accountType.name")
                .addGroupBy("mass.name")
                .having("SUM(CAST(journal.amount AS FLOAT)) > 0")
                .where("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .offset((input.page - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE)
                .getRawMany();
            const count = yield this.countDataInjournal(input);
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { journals: result, count, totalPages };
        });
    }
    GetTransactions(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            // let projectName = name.toLowerCase();
            const [journals, count] = yield data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .leftJoinAndSelect("journal.account", "account")
                .leftJoinAndSelect("account.accountType", "accountType")
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .orderBy("journal.id", "DESC")
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { journals, count, totalPages };
        });
    }
    GetJournalPdfData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .leftJoinAndSelect("journal.account", "account")
                .select([
                "account.code",
                "account.id",
                "account.name",
                "journal.amount",
                "journal.createdAt",
                "journal.description",
                "journal.transactionCode",
                "journal.transactionType",
            ])
                .where("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            })
                .andWhere("journal.userId = :userId", { userId: input.userId });
            if (input.projectId > 0) {
                query.andWhere("journal.projectId = :projectId", {
                    projectId: input.projectId,
                });
            }
            if (input.serviceId > 0) {
                query.andWhere("journal.serviceId = :serviceId", {
                    serviceId: input.serviceId,
                });
            }
            const [journals] = yield query.getManyAndCount();
            return { journals };
        });
    }
    deleteTransaction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder('journal')
                .softDelete()
                .where("transactionCode = :transactionCode", {
                transactionCode: input.transactionCode,
            })
                .andWhere("userId = :userId", { userId: input.userId })
                .execute();
            return result;
        });
    }
    EditTransaction(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = input, restInput = __rest(input, ["id"]);
            const result = yield this.db.update(restInput, id);
            if (!result)
                throw new Error("transaction not found !");
            return input;
        });
    }
    getTransactionDetailByAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            const query = data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .select([
                "journal.id",
                "journal.amount",
                "journal.transactionType",
                "journal.description",
                "journal.createdAt",
            ])
                .where("journal.accountId = :accountId", { accountId: input.accountId })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            });
            if (input.projectId > 0) {
                query.andWhere("journal.projectId = :projectId", {
                    projectId: input.projectId,
                });
            }
            if (input.serviceId > 0) {
                query.andWhere("journal.serviceId = :serviceId", {
                    serviceId: input.serviceId,
                });
            }
            const [transactions, count] = yield query
                .orderBy("journal.id", "DESC")
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { transactions, count, totalPages };
        });
    }
    getPreviousTreasuryOp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const credit = Journal_1.JournalTransactionType.CREDIT;
            const debit = Journal_1.JournalTransactionType.DEBIT;
            const massId = Mass_1.enumMassType.TRESORERIE_ACTIF;
            const previousDate = (0, util_1.getPreviousDate)(input.currDate, 16);
            const result = yield data_source_1.AppDataSource.getRepository(Account_1.Account)
                .createQueryBuilder("account")
                .leftJoinAndSelect("account.journals", "journal")
                .select("SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:credit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)", "totalCreditAmount")
                .addSelect("SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:debit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)", "totalDebitAmount")
                .addSelect("journal.createdAt", "createdAt")
                .where("account.massId IN (:...accountMassIds)", {
                accountMassIds: [massId, massId],
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: previousDate,
                date2: input.currDate,
            })
                .setParameters({ massId, credit, debit })
                .groupBy("journal.createdAt")
                .getRawMany();
            return result;
        });
    }
    expensesVsEarnings(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const massId = Mass_1.enumMassType.TRESORERIE_ACTIF;
            const credit = Journal_1.JournalTransactionType.CREDIT;
            const debit = Journal_1.JournalTransactionType.DEBIT;
            const result = yield data_source_1.AppDataSource.getRepository(Journal_1.Journal)
                .createQueryBuilder("journal")
                .leftJoinAndSelect("journal.account", "account")
                .select("SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:credit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)", "totalExpenses")
                .addSelect("SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:debit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)", "totalEarnings")
                .where("account.massId IN (:...accountMassIds)", {
                accountMassIds: [massId, massId],
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .andWhere("journal.createdAt = :createdAt", {
                createdAt: input.createdAt,
            })
                .setParameters({ massId, credit, debit })
                .getRawOne();
            if (result.totalExpenses == null) {
                return { totalExpenses: 0, totalEarnings: 0 };
            }
            return result;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "recordTransaction", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "saveIntoJournalService", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "getGeneralLedger", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "countDataInjournal", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "getBalance", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "GetTransactions", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "GetJournalPdfData", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "deleteTransaction", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "EditTransaction", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "getTransactionDetailByAccount", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "getPreviousTreasuryOp", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormJournalRepo.prototype, "expensesVsEarnings", null);
exports.TypeormJournalRepo = TypeormJournalRepo;
exports.journalRepo = new TypeormJournalRepo();
//# sourceMappingURL=TypeormJournalRepo.js.map