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
exports.DeleteTransaction = void 0;
const TypeormJournalRepo_1 = require("../../../repository/TypeormJournalRepo");
const DeleteTransaction_1 = require("../../../domain-model/usecases/DeleteTransaction");
class DeleteTransaction {
    static execute(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionCode = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.transactionCode;
                const userId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId;
                const input = {
                    userId: parseInt(userId),
                    transactionCode: transactionCode
                };
                const useCase = new DeleteTransaction_1.DeleteTransactionUseCase(TypeormJournalRepo_1.journalRepo);
                yield useCase.execute(input);
                res.status(200).send({ message: "Transaction supprimer avec succès !", success: true });
            }
            catch (error) {
                // next(error);
                res.status(422).send({ message: error.message, success: false });
            }
        });
    }
}
exports.DeleteTransaction = DeleteTransaction;
//# sourceMappingURL=deleteTransaction.js.map