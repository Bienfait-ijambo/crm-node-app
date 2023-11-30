import { Maybe } from "graphql/jsutils/Maybe";
import {
  JournalTransactionType,
  journalTransactionValType,
} from "../../../../../../../entities/Journal";
import { TFR_ACCOUNT, Tfr, resultTypeNameType } from "../../../../../../../entities/Trf";
import { filterTfrData } from "../filterTfrData";

export interface ITfrDataFromDB {
  account: number;
  amount: string;
  createdAt: string;
  deletedAt: null | string;
  id: number;
  period: string;
  resultType: resultTypeNameType;
  transactionType: number;
  updatedAt: string;
  userId: number;
}

/**
 * process tfr db data
 */
export class ProcessGrossMargin {
 

  static getGrossMargin(TfrData:Tfr[]) {
    const array = filterTfrData(TfrData,"MARGE_BRUTE");
    const transactions = [];
    let totalDebitAmount = 0;
    let totalCreditAmount = 0;
    let sold = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i].transactionType === JournalTransactionType.DEBIT) {
        transactions.push({
          style: "non",
          resultType: "MARGE_BRUTE",
          account: array[i].account,
          designation: "--- com",
          debit: array[i].amount,
          credit: null,
        });

        totalDebitAmount += parseFloat(array[i].amount);
      }

      if (array[i].transactionType === JournalTransactionType.CREDIT) {
        transactions.push({
          style: "non",
          resultType: "MARGE_BRUTE",
          account: array[i].account,
          designation: "--- com",
          debit: null,
          credit: array[i].amount,
        });

        totalCreditAmount += parseFloat(array[i].amount);
      }

    
    }

      //
      let transactionType: journalTransactionValType;

      if (totalDebitAmount > totalCreditAmount) {
        sold += totalDebitAmount - totalCreditAmount;
        transactionType = JournalTransactionType.DEBIT;
      } else {
        sold += totalCreditAmount - totalDebitAmount;
        transactionType = JournalTransactionType.CREDIT;
      }

    transactions.push({
        style: "to_bold",
        resultType: "MARGE_BRUTE",
        account: TFR_ACCOUNT.MARGE_BRUTE,
        designation: "MARGE BRUTE",
        debit: sold,
        credit: sold,
      })


      return transactions
  }


}
