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
exports.GetGeneralLedgerUseCase = void 0;
class GetGeneralLedgerUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.accountId.length > 0 && input.startDate !== "" && input.endDate !== "") {
                const result = yield this.repo.getGeneralLedger(input);
                return result;
            }
            else {
                return [];
            }
        });
    }
}
exports.GetGeneralLedgerUseCase = GetGeneralLedgerUseCase;
//# sourceMappingURL=GetGeneralLedger.js.map