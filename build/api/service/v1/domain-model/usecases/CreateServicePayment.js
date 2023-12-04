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
exports.CreateServicePaymentUseCase = void 0;
const Journal_1 = require("../../../../../entities/Journal");
const Mass_1 = require("../../../../../entities/Mass");
const CreateServicePaymentDto_1 = require("../dto/CreateServicePaymentDto");
class CreateServicePaymentUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    execute(journalInput) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < journalInput.length; i++) {
                const item = journalInput[i];
                if (item.transactionType === Journal_1.JournalTransactionType.DEBIT &&
                    item.massId === Mass_1.enumMassType.TRESORERIE_ACTIF) {
                    yield this.createServicePayment(journalInput, CreateServicePaymentDto_1.paymentServiceStatus.GAIN);
                }
                else if (item.transactionType === Journal_1.JournalTransactionType.CREDIT &&
                    item.massId === Mass_1.enumMassType.TRESORERIE_ACTIF) {
                    yield this.createServicePayment(journalInput, CreateServicePaymentDto_1.paymentServiceStatus.EXPENSE);
                }
            }
        });
    }
    createServicePayment(journalInput, serviceStatus) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (journalInput[0].serviceId > 0) {
                const input = {
                    serviceId: journalInput[0].serviceId,
                    amount: journalInput[0].amount,
                    userId: journalInput[0].userId,
                };
                if (typeof ((_a = journalInput[0]) === null || _a === void 0 ? void 0 : _a.createdAt) === "undefined" || ((_b = journalInput[0]) === null || _b === void 0 ? void 0 : _b.createdAt) === "") {
                    const dto = new CreateServicePaymentDto_1.CreateServicePaymentDto(input);
                    yield this.repo.createServicePayment(dto.getInput_Without_Date(serviceStatus));
                }
                if (this.isValidDate((_c = journalInput[0]) === null || _c === void 0 ? void 0 : _c.createdAt)) {
                    const newInput = Object.assign({ createdAt: journalInput[0].createdAt }, input);
                    const dto = new CreateServicePaymentDto_1.CreateServicePaymentDto(newInput);
                    yield this.repo.createServicePayment(dto.getInput_With_Date(serviceStatus));
                }
            }
        });
    }
    isValidDate(input) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const isValid = regex.test(input);
        if (isValid) {
            return !isNaN(new Date(input).getTime()) ? true : false;
        }
        return false;
    }
}
exports.CreateServicePaymentUseCase = CreateServicePaymentUseCase;
//# sourceMappingURL=CreateServicePayment.js.map