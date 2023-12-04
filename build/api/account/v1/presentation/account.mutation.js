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
exports.accountMutations = void 0;
const TypeormAccountRepo_1 = require("../repository/TypeormAccountRepo");
const CreateAccount_1 = require("../domain-model/usecases/CreateAccount");
const UpdateAccount_1 = require("../domain-model/usecases/UpdateAccount");
const TypeormAggregateAccount_1 = require("../../../aggregate-account-amount/repository/TypeormAggregateAccount");
exports.accountMutations = {
    createAccount: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateAccount_1.CreateAccountUseCase(TypeormAccountRepo_1.accountRepo, TypeormAggregateAccount_1.aggregateAccountRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    updateAccount: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new UpdateAccount_1.UpdateAccountUseCase(TypeormAccountRepo_1.accountRepo);
        return yield usecase.execute(input);
    }),
};
//# sourceMappingURL=account.mutation.js.map