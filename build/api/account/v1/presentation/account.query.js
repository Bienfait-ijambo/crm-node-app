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
exports.accountQueries = void 0;
const TypeormAccountRepo_1 = require("../repository/TypeormAccountRepo");
const GetAccount_1 = require("../domain-model/usecases/GetAccount");
exports.accountQueries = {
    accounts: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetAccount_1.GetAccountUseCase(TypeormAccountRepo_1.accountRepo);
        const { accounts, count, totalPages } = yield usecase.execute(input);
        return { accounts, count, totalPages };
    }),
};
//# sourceMappingURL=account.query.js.map