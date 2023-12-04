"use strict";
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
exports.GetPartnerUserCase = void 0;
class GetPartnerUserCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(name, userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getPartners(name, userId, page);
            return result;
        });
    }
}
exports.GetPartnerUserCase = GetPartnerUserCase;
// Dependency Injection is a design pattern that allows objects to receive dependencies
//  (i.e., objects or values that they depend on) from outside sources, rather than creating them internally. 
//# sourceMappingURL=GetPartner.js.map