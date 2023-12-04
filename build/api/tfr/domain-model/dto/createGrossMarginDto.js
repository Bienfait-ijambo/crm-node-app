"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGrossMarginDto = void 0;
const Journal_1 = require("../../../../entities/Journal");
const TfrResultAccount_1 = require("../../../../entities/TfrResultAccount");
const Trf_1 = require("../../../../entities/Trf");
class CreateGrossMarginDto {
    constructor(input) {
        this.input = input;
        if (this.isValid() === false) {
            throw new Error("Les valeurs que vous venez d'entre sont invalides !");
        }
    }
    isValid() {
        if (this.input.chargeAccount.code === Trf_1.SOLD_STOCK &&
            this.input.profitAccount.code === Trf_1.SOLD_MERCHENDISE &&
            this.input.chargeAccount.amount > 0 &&
            this.input.profitAccount.amount > 0) {
            return true;
        }
        return false;
    }
    getTfrResultAccountInput() {
        const { transactionType, amount } = this.getGrossMarginAmount();
        return new TfrResultAccount_1.TfrResultAccount(80, transactionType, "MARGE_BRUTE", amount.toString(), this.input.period, this.input.userId);
    }
    getGrossMarginAmount() {
        let sold = 0;
        let transactionType;
        if (this.input.chargeAccount.amount > this.input.profitAccount.amount) {
            sold += this.input.chargeAccount.amount - this.input.profitAccount.amount;
            transactionType = Journal_1.JournalTransactionType.DEBIT;
        }
        else {
            sold += this.input.profitAccount.amount - this.input.chargeAccount.amount;
            transactionType = Journal_1.JournalTransactionType.CREDIT;
        }
        return { transactionType: transactionType, amount: sold };
    }
    getGrossMarginInput() {
        return [
            // charge account
            new Trf_1.Tfr(this.input.chargeAccount.code, this.input.chargeAccount.transactionType.val, "MARGE_BRUTE", this.input.chargeAccount.amount.toString(), this.input.period, this.input.userId),
            new Trf_1.Tfr(this.input.profitAccount.code, this.input.profitAccount.transactionType.val, "MARGE_BRUTE", this.input.profitAccount.amount.toString(), this.input.period, this.input.userId),
        ];
    }
}
exports.CreateGrossMarginDto = CreateGrossMarginDto;
//# sourceMappingURL=createGrossMarginDto.js.map