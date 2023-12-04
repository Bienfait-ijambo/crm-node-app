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
exports.CreateProjectPaymentUseCase = void 0;
const Journal_1 = require("../../../../../entities/Journal");
const Mass_1 = require("../../../../../entities/Mass");
class CreateProjectPaymentUseCase {
    constructor(repo) {
        this.repo = repo;
        this.errorMessage = '';
        this.repo = repo;
    }
    // @catchError
    execute(journalInput) {
        return __awaiter(this, void 0, void 0, function* () {
            //checks if journalInput has projectId by checking if id > 0
            if (journalInput[0].projectId > 0) {
                let accountAmount = 0;
                for (let i = 0; i < journalInput.length; i++) {
                    const item = journalInput[i];
                    if (item.transactionType === Journal_1.JournalTransactionType.CREDIT && item.massId === Mass_1.enumMassType.TRESORERIE_ACTIF) {
                        accountAmount += parseFloat(item.amount);
                    }
                }
                yield this.createProjectPayment(journalInput, accountAmount);
                return this.errorMessage;
            }
            else {
                return this.errorMessage;
            }
        });
    }
    createProjectPayment(journalInput, accountAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                projectId: journalInput[0].projectId,
                amount: journalInput[0].amount,
                userId: journalInput[0].userId,
            };
            const { paidAmount, amount } = yield this.getProjectAmount(input.projectId, input.userId);
            const restAmount = amount - paidAmount;
            if (accountAmount <= restAmount) {
                const getTotalPaidAmount = restAmount + accountAmount;
                //make payment
                yield this.processProjectPayment(journalInput, paidAmount, accountAmount);
                if (getTotalPaidAmount === amount) {
                    //change project status
                    yield this.repo.changeProjectStatus(journalInput[0].projectId);
                }
            }
            else {
                this.errorMessage = 'INVALID_AMOUNT';
            }
        });
    }
    processProjectPayment(journalInput, paidAmount, accountAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                projectId: journalInput[0].projectId,
                amount: journalInput[0].amount,
                userId: journalInput[0].userId,
            };
            this.repo.createProjectPayment(input);
            this.repo.updatePaidAmountField((paidAmount + accountAmount), input.projectId);
        });
    }
    /**
     *
     * @param projectId
     * @param userId
     * get project amount to be paid and paidAmount
     */
    getProjectAmount(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getProjectAmount(projectId, userId);
            //get paidAmount 
            const paidAmount = parseFloat(result.paidAmount);
            //get amount to be paid
            const amount = parseFloat(result.amount);
            return { paidAmount, amount };
        });
    }
}
exports.CreateProjectPaymentUseCase = CreateProjectPaymentUseCase;
//# sourceMappingURL=CreateProjectPayment.js.map