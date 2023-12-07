"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGrossMarginDto = void 0;
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
    getGrossMarginInput() {
        return [
            // charge account
            new Trf_1.Tfr(this.input.chargeAccount.code, this.input.chargeAccount.transactionType.val, this.input.chargeAccount.accountName, 'MARGE_BRUTE', this.input.chargeAccount.amount.toString(), this.input.periodCode, this.input.userId),
            new Trf_1.Tfr(this.input.profitAccount.code, this.input.profitAccount.transactionType.val, this.input.profitAccount.accountName, 'MARGE_BRUTE', this.input.profitAccount.amount.toString(), this.input.periodCode, this.input.userId),
        ];
    }
}
exports.CreateGrossMarginDto = CreateGrossMarginDto;
//# sourceMappingURL=createGrossMarginDto.js.map