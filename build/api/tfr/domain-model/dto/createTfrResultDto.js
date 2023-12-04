"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTfrResultDto = void 0;
const Journal_1 = require("../../../../entities/Journal");
const TfrResultAccount_1 = require("../../../../entities/TfrResultAccount");
const Trf_1 = require("../../../../entities/Trf");
/**
 * create other tff result expect dto
 */
class CreateTfrResultDto {
    constructor(input) {
        this.input = input;
        if (!this.isValid()) {
            throw new Error("Désolez, le montant doit être supérieur à zero !");
        }
    }
    isValid() {
        let error = 0;
        for (let i = 0; i < this.input.length; i++) {
            if (this.input[i].amount < 0) {
                error++;
            }
        }
        return error > 0 ? false : true;
    }
    getTFRValueAddedResult(code, resultType) {
        const { transactionType, amount } = this.calculateValueAddedResult();
        return new TfrResultAccount_1.TfrResultAccount(code, transactionType, resultType, amount.toString(), this.input[0].period, this.input[0].userId);
    }
    calculateValueAddedResult() {
        let totalDebitAmount = 0;
        let totalCreditAmount = 0;
        let transactionType;
        let sold = 0;
        const debitAccounts = this.input.filter((account) => account.transactionType === Journal_1.JournalTransactionType.DEBIT);
        const creditAccounts = this.input.filter((account) => account.transactionType === Journal_1.JournalTransactionType.CREDIT);
        debitAccounts.forEach(account => {
            totalCreditAmount += account.amount;
        });
        creditAccounts.forEach(account => {
            totalDebitAmount += account.amount;
        });
        if (totalDebitAmount > totalCreditAmount) {
            sold += totalDebitAmount - totalCreditAmount;
            transactionType = Journal_1.JournalTransactionType.DEBIT;
        }
        else {
            sold += totalCreditAmount - totalDebitAmount;
            transactionType = Journal_1.JournalTransactionType.CREDIT;
        }
        return { transactionType: transactionType, amount: sold };
    }
    getValueAddedInput(resultType) {
        const input = [];
        for (let i = 0; i < this.input.length; i++) {
            input.push(new Trf_1.Tfr(this.input[i].account, this.input[i].transactionType, resultType, this.input[i].amount.toString(), this.input[i].period, this.input[i].userId));
        }
        return input;
    }
}
exports.CreateTfrResultDto = CreateTfrResultDto;
//# sourceMappingURL=createTfrResultDto.js.map