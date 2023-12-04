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
exports.aggregateAccountQuery = void 0;
const TypeormAggregateAccount_1 = require("../repository/TypeormAggregateAccount");
const GetTreasuryAccount_1 = require("../usecases/GetTreasuryAccount");
exports.aggregateAccountQuery = {
    treasuryAccounts: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetTreasuryAccount_1.GetTreasuryAccountUseCase(TypeormAggregateAccount_1.aggregateAccountRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
};
//# sourceMappingURL=aggregateAccount.mutation.js.map