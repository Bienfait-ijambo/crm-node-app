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
exports.AffectAmountUseCase = void 0;
const CreateAffectProjectAmountInput_1 = require("../Dto/CreateAffectProjectAmountInput");
class AffectAmountUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new CreateAffectProjectAmountInput_1.CreateAffectProjectAmountInput(input);
            const result = yield this.affectAmountToProject(input);
            return result ? { success: true } : { success: false };
        });
    }
    /**
     *
     * @param projectId
     * @param userId
     * get project amount to be paid and paidAmount
     */
    affectAmountToProject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getProjectAmount(input.projectId, input.userId);
            //get paidAmount
            const amount = parseFloat(result.amount);
            const amountToAdd = parseFloat(input.amount);
            if (input.status === true) {
                const totalAmount = amount + amountToAdd;
                //update project amount
                const result = yield this.repo.affectAmountToProject(totalAmount, input.projectId);
                return result;
            }
            if (input.status === false) {
                if (amount >= amountToAdd) {
                    const totalAmount = amount - amountToAdd;
                    //update project amount
                    const result = yield this.repo.affectAmountToProject(totalAmount, input.projectId);
                    return result;
                }
                else {
                    throw new Error('Le montant entre est supérieure au cout du projet !');
                }
            }
        });
    }
}
exports.AffectAmountUseCase = AffectAmountUseCase;
//# sourceMappingURL=AffectAmount.js.map