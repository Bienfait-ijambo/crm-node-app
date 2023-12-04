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
exports.CreatePartnerUseCase = void 0;
const PartnerDomain_1 = require("../dto/PartnerDomain");
class CreatePartnerUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const partnerDomain = PartnerDomain_1.PartnerDomain.createPartnerInput(input);
            const emailExist = yield this.repo.findPartnerByEmail(input);
            if (emailExist)
                throw new Error(`Cette adresse mail existe déjà !`);
            const user = yield this.repo.createPartner(partnerDomain);
            // await emailVerificationQueue.addEmailQueue(user.email,user.optNumber);
            return user;
        });
    }
}
exports.CreatePartnerUseCase = CreatePartnerUseCase;
//# sourceMappingURL=CreatePartner.js.map