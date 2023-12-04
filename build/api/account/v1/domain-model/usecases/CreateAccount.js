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
exports.CreateAccountUseCase = void 0;
const data_source_1 = require("../../../../../infrastructure/typeorm/data-source");
const CreateAccountInput_1 = require("../dto/CreateAccountInput");
class CreateAccountUseCase {
    constructor(accountRepo, aggregateAccountRepo) {
        this.accountRepo = accountRepo;
        this.aggregateAccountRepo = aggregateAccountRepo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new CreateAccountInput_1.CreateAccountInput(input);
            const result = yield data_source_1.AppDataSource.transaction(() => __awaiter(this, void 0, void 0, function* () {
                const accountExist = yield this.accountRepo.findAccountByCode(input.code, input.userId);
                if (accountExist !== null)
                    throw new Error('Vous avez déjà enregistré ce compte !');
                const result = yield this.accountRepo.createAccount(dto.getInput());
                yield this.saveAccountInAggregateTable(result.id, input);
                return result;
            }));
            return result;
        });
    }
    /**
     * save account into aggregate_account_amount table
     */
    saveAccountInAggregateTable(accountId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.aggregateAccountRepo.recordData([{
                    accountId: accountId,
                    accountType: input.typeId,
                    totalAmount: '0',
                    userId: input.userId
                }]);
        });
    }
}
exports.CreateAccountUseCase = CreateAccountUseCase;
//# sourceMappingURL=CreateAccount.js.map