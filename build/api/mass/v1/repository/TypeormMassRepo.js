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
exports.MassRepo = exports.TypeormMassRepo = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const Mass_1 = require("../../../../entities/Mass");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const MassMapper_1 = require("./MassMapper");
class TypeormMassRepo {
    constructor() {
        this.db = new DB_1.DB(Mass_1.Mass);
    }
    createMass(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.save(input);
            return MassMapper_1.MassMapper.toDto(result);
        });
    }
    getMass() {
        return __awaiter(this, void 0, void 0, function* () {
            const masses = yield data_source_1.AppDataSource
                .getRepository(Mass_1.Mass)
                .createQueryBuilder("mass")
                .orderBy('id', 'DESC')
                .getMany();
            return MassMapper_1.MassMapper.fromEntity(masses);
        });
    }
    getMassByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const mass = yield this.db.getOneByColumnName("mass", "name", {
                name: name,
            });
            return mass == null ? false : true;
        });
    }
    updateMass(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = input, restInput = __rest(input, ["id"]);
            const result = yield this.db.update(restInput, id);
            if (!result)
                throw new Error("Ce Mass n'existe pas !");
            return input;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Mass_1.Mass]),
    __metadata("design:returntype", Promise)
], TypeormMassRepo.prototype, "createMass", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeormMassRepo.prototype, "getMass", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormMassRepo.prototype, "getMassByName", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormMassRepo.prototype, "updateMass", null);
exports.TypeormMassRepo = TypeormMassRepo;
exports.MassRepo = new TypeormMassRepo();
//# sourceMappingURL=TypeormMassRepo.js.map