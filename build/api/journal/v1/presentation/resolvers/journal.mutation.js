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
exports.journalMutations = void 0;
const TypeormJournalRepo_1 = require("../../repository/TypeormJournalRepo");
const EditTransaction_1 = require("../../domain-model/usecases/EditTransaction");
const RecordTransaction_1 = require("../../domain-model/usecases/RecordTransaction");
const TypeormAggregateAccount_1 = require("../../../../aggregate-account-amount/repository/TypeormAggregateAccount");
const TypeormServiceRepo_1 = require("../../../../service/v1/repository/TypeormServiceRepo");
const TypeormProjectRepo_1 = require("../../../../projet/v1/repository/TypeormProjectRepo");
exports.journalMutations = {
    recordTransaction: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new RecordTransaction_1.RecordTransactionUseCase(TypeormJournalRepo_1.journalRepo, TypeormAggregateAccount_1.aggregateAccountRepo, TypeormServiceRepo_1.serviceRepo, TypeormProjectRepo_1.ProjectRepo);
        yield usecase.execute(input);
        return {
            id: "",
            description: "Transaction effectué avec succès !",
        };
    }),
    editTransaction: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new EditTransaction_1.EditTransactionUseCase(TypeormJournalRepo_1.journalRepo);
        return yield usecase.execute(input);
    }),
};
//# sourceMappingURL=journal.mutation.js.map