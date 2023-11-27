import {
  JournalTransactionType,
  journalTransactionValType,
} from "../../../../entities/Journal";
import { TfrResultAccount } from "../../../../entities/TfrResultAccount";
import { SOLD_MERCHENDISE, SOLD_STOCK, Tfr } from "../../../../entities/Trf";
import { TfrAccount } from "../../../../shared/types/brandTypes";
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

  getTfrResultAccountInput() {
    const { transactionType, amount } = this.getGrossMarginAmount();
    return new TfrResultAccount(
      80 as TfrAccount,
      transactionType,
      "MARGE_BRUTE",
      amount.toString(),
      this.input.period,
      this.input.userId
    );
  }

  private getGrossMarginAmount() {
    let sold = 0;
    let transactionType: journalTransactionValType;

    if (this.input.chargeAccount.amount > this.input.profitAccount.amount) {
      sold += this.input.chargeAccount.amount - this.input.profitAccount.amount;
      transactionType = JournalTransactionType.DEBIT;
    } else {
      sold += this.input.profitAccount.amount - this.input.chargeAccount.amount;
      transactionType = JournalTransactionType.CREDIT;
    }
    return { transactionType: transactionType, amount: sold };
  }

  getGrossMarginInput() {
    return [
      // charge account
      new Tfr(
        this.input.chargeAccount.code,
        this.input.chargeAccount.transactionType.val,
        "MARGE_BRUTE",
        this.input.chargeAccount.amount.toString(),
        this.input.period,
        this.input.userId
      ),
      new Tfr(
        this.input.profitAccount.code,
        this.input.profitAccount.transactionType.val,
        "MARGE_BRUTE",
        this.input.profitAccount.amount.toString(),
        this.input.period,
        this.input.userId
      ),
    ];
  }

  
}
