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
exports.partnerRepo = exports.TypeormPartnerRepo = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const Partner_1 = require("../../../../entities/Partner");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const PartnerMapper_1 = require("./PartnerMapper");
class TypeormPartnerRepo {
    constructor() {
        this.db = new DB_1.DB(Partner_1.Partner);
    }
    createPartner(partner) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.save(partner);
            return PartnerMapper_1.PartnerMapper.toDto(result);
        });
    }
    findPartnerByEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(Partner_1.Partner)
                .createQueryBuilder('partner')
                .where(`partner.email = :email`, { email: input.email })
                .andWhere(`partner.userId = :userId`, { userId: input.userId })
                .getOne();
            if (result)
                return result;
        });
    }
    getPartners(name, userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            let partName = name.toLowerCase();
            const [partners, count] = yield data_source_1.AppDataSource.getRepository(Partner_1.Partner)
                .createQueryBuilder("partner")
                .where("lower(partner.name) LIKE :partName", { partName: `%${partName}%` })
                .andWhere('partner.userId = :userId', { userId: userId })
                .skip((page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { partners, count, totalPages };
        });
    }
    updatePartner(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = input, restInput = __rest(input, ["id"]);
            const result = yield this.db.update(restInput, id);
            if (!result)
                throw new Error("partner not found !");
            return input;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Partner_1.Partner]),
    __metadata("design:returntype", Promise)
], TypeormPartnerRepo.prototype, "createPartner", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormPartnerRepo.prototype, "findPartnerByEmail", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormPartnerRepo.prototype, "getPartners", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormPartnerRepo.prototype, "updatePartner", null);
exports.TypeormPartnerRepo = TypeormPartnerRepo;
exports.partnerRepo = new TypeormPartnerRepo();
//# sourceMappingURL=TypeormPartnerRepo.js.map