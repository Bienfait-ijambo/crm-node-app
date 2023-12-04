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
exports.partnerQueries = void 0;
const TypeormPartnerRepo_1 = require("../repository/TypeormPartnerRepo");
const GetPartner_1 = require("../domain-model/usecases/GetPartner");
exports.partnerQueries = {
    partners: (root, { name, userId, page }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        // verifyToken(token)
        const usecase = new GetPartner_1.GetPartnerUserCase(TypeormPartnerRepo_1.partnerRepo);
        const { partners, count, totalPages } = yield usecase.execute(name, userId, page);
        return { partners, count, totalPages };
    }),
};
//# sourceMappingURL=partner.query.js.map