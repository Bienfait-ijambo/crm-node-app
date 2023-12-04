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
exports.journalQueries = void 0;
const TypeormJournalRepo_1 = require("../../repository/TypeormJournalRepo");
const GetBalance_1 = require("../../domain-model/usecases/GetBalance");
const GetTransactions_1 = require("../../domain-model/usecases/GetTransactions");
const GetGeneralLedger_1 = require("../../domain-model/usecases/GetGeneralLedger");
const ExpensesVsEarnings_1 = require("../../domain-model/usecases/ExpensesVsEarnings");
const GetTransactionDetailByAccount_1 = require("../../domain-model/usecases/GetTransactionDetailByAccount");
const GetPreviousTreasuryOp_1 = require("../../domain-model/usecases/GetPreviousTreasuryOp");
exports.journalQueries = {
    journals: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetTransactions_1.GetAllTransactionUseCase(TypeormJournalRepo_1.journalRepo);
        const { journals, count, totalPages } = yield usecase.execute(input);
        return { journals, count, totalPages };
    }),
    balance: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetBalance_1.GetBalanceUseCase(TypeormJournalRepo_1.journalRepo);
        const { journals, count, totalPages } = yield usecase.execute(input);
        return { journals, count, totalPages };
    }),
    generalLedger: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetGeneralLedger_1.GetGeneralLedgerUseCase(TypeormJournalRepo_1.journalRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    expensesVsEarnings: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new ExpensesVsEarnings_1.ExpensesVsEarningsUseCase(TypeormJournalRepo_1.journalRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    transactionDetailByAccount: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetTransactionDetailByAccount_1.GetTransactionDetailByAccount(TypeormJournalRepo_1.journalRepo);
        const { transactions, count, totalPages } = yield usecase.execute(input);
        return { transactions, count, totalPages };
    }),
    getPreviousTreasuryOp: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetPreviousTreasuryOp_1.GetPreviousTreasuryOp(TypeormJournalRepo_1.journalRepo);
        const result = yield usecase.execute(input);
        return result;
    })
};
//# sourceMappingURL=journal.query.js.map