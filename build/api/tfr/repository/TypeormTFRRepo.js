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
exports.tfrRepo = exports.TypeormTFRRepo = void 0;
const PeriodicTfrResult_1 = require("../../../entities/PeriodicTfrResult");
const TfrResultAccount_1 = require("../../../entities/TfrResultAccount");
const Trf_1 = require("../../../entities/Trf");
const data_source_1 = require("../../../infrastructure/typeorm/data-source");
const CachError_1 = require("../../../shared/exceptions/CachError");
class TypeormTFRRepo {
    createPeriodicTfrResult(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(PeriodicTfrResult_1.PeriodicTfrResult).save(input);
            return result;
        });
    }
    //  @catchError
    getPeriodTfrResult(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            // let serviceName = name.toLowerCase();
            const [periodicData, count] = yield data_source_1.AppDataSource.getRepository(PeriodicTfrResult_1.PeriodicTfrResult)
                .createQueryBuilder("periodic_tfr_result")
                // .where("lower(service.name) LIKE :serviceName", { serviceName: `%${serviceName}%` })
                .where('periodic_tfr_result.userId = :userId', { userId: input.userId })
                .skip((input.page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { periodicData, count, totalPages };
        });
    }
    createTfrResulatAccount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into(TfrResultAccount_1.TfrResultAccount)
                .values(input)
                .execute();
            return input;
        });
    }
    createTFr(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder()
                .insert()
                .into(Trf_1.Tfr)
                .values(input)
                .execute();
            return input;
        });
    }
    getTfrData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(Trf_1.Tfr)
                .createQueryBuilder("tfr")
                .where("tfr.period =:period", { period: input.period })
                .andWhere("tfr.userId = :userId", { userId: input.userId })
                .getMany();
            return result;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormTFRRepo.prototype, "createPeriodicTfrResult", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TfrResultAccount_1.TfrResultAccount]),
    __metadata("design:returntype", Promise)
], TypeormTFRRepo.prototype, "createTfrResulatAccount", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TypeormTFRRepo.prototype, "createTFr", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormTFRRepo.prototype, "getTfrData", null);
exports.TypeormTFRRepo = TypeormTFRRepo;
exports.tfrRepo = new TypeormTFRRepo();
//# sourceMappingURL=TypeormTFRRepo.js.map