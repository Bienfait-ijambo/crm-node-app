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
exports.pageRepo = exports.TypeormPageRepo = void 0;
const data_source_1 = require("../../../infrastructure/typeorm/data-source");
const CachError_1 = require("../../../shared/exceptions/CachError");
class TypeormPageRepo {
    getPages() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        SELECT "client_pages"."pageName" ->>'id' as "id",
"client_pages"."pageName" ->>'name' as "name","client_pages"."pageName" ->'actions' as actions,"client_pages"."pageName" ->>'displayName' as "displayName"   FROM client_pages
        `;
            const result = yield data_source_1.AppDataSource.query(query);
            return result;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeormPageRepo.prototype, "getPages", null);
exports.TypeormPageRepo = TypeormPageRepo;
exports.pageRepo = new TypeormPageRepo();
//# sourceMappingURL=TypeormPageRepo.js.map