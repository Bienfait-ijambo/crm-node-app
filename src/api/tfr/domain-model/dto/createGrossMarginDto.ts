
import { SOLD_MERCHENDISE, SOLD_STOCK, Tfr } from "../../../../entities/Trf";
import { GrossMarginInput } from "../usecases/interfaces/tfr.interfaces";

export type tfrInputToInsertType = Array<{
  account: number;
  transactionType: string;
  amount: number;
  period: string;
  userId: number;
}>;

export class CreateGrossMarginDto {
  private input: GrossMarginInput;

  constructor(input: GrossMarginInput) {
    this.input = input;
    if (this.isValid() === false) {
      throw new Error("Les valeurs que vous venez d'entre sont invalides !");
    }
  }

  private isValid() {
    if (
      this.input.chargeAccount.code === SOLD_STOCK &&
      this.input.profitAccount.code === SOLD_MERCHENDISE &&
      this.input.chargeAccount.amount > 0 &&
      this.input.profitAccount.amount > 0
    ) {
      return true;
    }

    return false;
  }

 
  getGrossMarginInput() {
    return [
      // charge account
      new Tfr(
        this.input.chargeAccount.code,
        this.input.chargeAccount.transactionType.val,
        this.input.chargeAccount.accountName,
        'MARGE_BRUTE',
        this.input.chargeAccount.amount.toString(),
        this.input.periodCode,
        this.input.userId
      ),
      new Tfr(
        this.input.profitAccount.code,
        this.input.profitAccount.transactionType.val,
        this.input.profitAccount.accountName,
        'MARGE_BRUTE',
        this.input.profitAccount.amount.toString(),
        this.input.periodCode,
        this.input.userId
      ),
    ];
  }

  
}
