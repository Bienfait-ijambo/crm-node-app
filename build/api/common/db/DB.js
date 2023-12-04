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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const logger_1 = require("../../../infrastructure/graphql-server/winston/logger");
const data_source_1 = require("../../../infrastructure/typeorm/data-source");
const CachError_1 = require("../../../shared/exceptions/CachError");
class DB {
    /**
   * @descr this DB class use Orm Query Builder interface
   * @constructor takes an entity as parameter
   *
   */
    constructor(entity) {
        this.entity = entity;
        this.repo = data_source_1.AppDataSource.getRepository(entity);
        this.queryBuilder = data_source_1.AppDataSource.createQueryBuilder();
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.save(data);
            return result;
        });
    }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.queryBuilder
                .update(this.entity)
                .set(data)
                .where("id = :id", { id: +id })
                .execute();
            return result.affected === 1 ? true : false;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.queryBuilder
                    .delete()
                    .from(this.entity)
                    .where("id = :id", { id: id })
                    .execute();
                if (result)
                    return true;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    get(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo
                    .createQueryBuilder(tableName)
                    .getMany();
                return result;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getOne(id, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo
                    .createQueryBuilder(tableName)
                    .where(`${tableName}.id = :id`, { id: id })
                    .getOne();
                return result;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getOneByColumnName(tableName, columnName, whereOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo
                    .createQueryBuilder(tableName)
                    .where(`${tableName}.${columnName} = :${columnName}`, whereOptions)
                    .getOne();
                return result;
            }
            catch (error) {
                (0, logger_1.logErrorToFile)(error, 'logg-error-3');
            }
        });
    }
    getMany(tableName, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo
                .createQueryBuilder(tableName)
                .select(columns)
                .getMany();
            return result;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Dto !== "undefined" && Dto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], DB.prototype, "save", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof T !== "undefined" && T) === "function" ? _b : Object, Number]),
    __metadata("design:returntype", Promise)
], DB.prototype, "update", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DB.prototype, "delete", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DB.prototype, "get", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof T !== "undefined" && T) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], DB.prototype, "getOne", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], DB.prototype, "getMany", null);
exports.DB = DB;
//# sourceMappingURL=DB.js.map