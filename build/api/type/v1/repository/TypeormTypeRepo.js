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
exports.TypeRepo = exports.TypeormTypeRepo = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const AccountType_1 = require("../../../../entities/AccountType");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const TypeMapper_1 = require("./TypeMapper");
const Mass_1 = require("../../../../entities/Mass");
class TypeormTypeRepo {
    constructor() {
        this.db = new DB_1.DB(AccountType_1.AccountType);
    }
    getAccountTypesWithMasses() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(AccountType_1.AccountType)
                .createQueryBuilder("account_type")
                .leftJoinAndSelect("account_type.masses", "mass")
                .orderBy("account_type.id", 'ASC')
                .getMany();
            return result;
        });
    }
    createType(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.save(input);
            return TypeMapper_1.TypeMapper.toDto(result);
        });
    }
    createAccounTypeMass(typeId, massId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into("account_type_masses_mass")
                .values({
                accountTypeId: typeId,
                massId: massId,
            })
                .execute();
        });
    }
    accountTypeHasMass(accountTypeId, massId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .select()
                .from("account_type_masses_mass", "at")
                .where("at.accountTypeId = :accountTypeId", {
                accountTypeId: accountTypeId,
            })
                .andWhere("at.massId = :massId", { massId: massId })
                .execute();
            return result.length == 0 ? false : true;
        });
    }
    updateAccounTypeMass(accountTypeId, massId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update("account_type_masses_mass")
                .set({ accountTypeId: accountTypeId, massId: massId })
                .where("accountTypeId = :accountTypeId", {
                accountTypeId: +accountTypeId,
            })
                .andWhere("massId = :massId", { massId: +massId })
                .execute();
            return result;
        });
    }
    updateType(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = input;
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(AccountType_1.AccountType)
                .set({ name: name })
                .where("id = :id", { id: +id })
                .execute();
            if (!result)
                throw new Error("Ce Type n'existe pas !");
            return input;
        });
    }
    getTypeByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.repo
                .createQueryBuilder("account_type")
                .where(`account_type.name = :name`, { name: name })
                .getOne();
            return result == null ? false : result;
        });
    }
    getTypeByNameAndMassId(name, massId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.repo
                .createQueryBuilder("account_type")
                .where(`account_type.name = :name`, { name: name })
                .andWhere(`account_type.massId = :massId`, { massId: massId })
                .getOne();
            return result == null ? false : true;
        });
    }
    getBilan(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 20;
            const [masses, count] = yield data_source_1.AppDataSource.getRepository(Mass_1.Mass)
                .createQueryBuilder("mass")
                .leftJoinAndSelect("mass.account", "account")
                .leftJoinAndSelect("account.accountType", "accountType")
                .leftJoinAndSelect("account.journals", "journal")
                .select(['mass.id', 'mass.name', 'account.code', 'account.name', 'account.id', 'journal.id', 'journal.transactionType', 'journal.amount'])
                .where("accountType.id IN(:...Ids)", {
                Ids: [AccountType_1.enumAccountType.ACTIF, AccountType_1.enumAccountType.PASSIF],
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            })
                .orderBy("journal.id", "DESC")
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { masses, count, totalPages };
        });
    }
    getResultAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 20;
            const [masses, count] = yield data_source_1.AppDataSource.getRepository(Mass_1.Mass)
                .createQueryBuilder("mass")
                .leftJoinAndSelect("mass.account", "account")
                .leftJoinAndSelect("account.accountType", "accountType")
                .leftJoinAndSelect("account.journals", "journal")
                .select(['mass.id', 'mass.name', 'account.code', 'account.name', 'account.id', 'journal.id', 'journal.transactionType', 'journal.amount'])
                .where("accountType.id IN(:...Ids)", {
                Ids: [AccountType_1.enumAccountType.CHARGES, AccountType_1.enumAccountType.PRODUIT],
            })
                .andWhere("journal.userId = :userId", { userId: input.userId })
                .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
                date1: input.startDate,
                date2: input.endDate,
            })
                .orderBy("journal.id", "DESC")
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { masses, count, totalPages };
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "getAccountTypesWithMasses", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "createAccounTypeMass", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "accountTypeHasMass", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "updateAccounTypeMass", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "updateType", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "getTypeByName", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "getTypeByNameAndMassId", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "getBilan", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormTypeRepo.prototype, "getResultAccount", null);
exports.TypeormTypeRepo = TypeormTypeRepo;
/**
 * account type
 */
exports.TypeRepo = new TypeormTypeRepo();
//# sourceMappingURL=TypeormTypeRepo.js.map