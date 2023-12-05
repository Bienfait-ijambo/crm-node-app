import { Maybe } from "graphql/jsutils/Maybe";
import {
  JournalTransactionType,
  journalTransactionValType,
} from "../../../../../../../entities/Journal";
import { TFR_ACCOUNT, Tfr, resultTypeNameType } from "../../../../../../../entities/Trf";
import { filterTfrData } from "../filterTfrData";
import { ISold, ProcessTfrResultHelper } from "../aggregateProcessedTfrData";

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
    let sold= {
      amount:'',
      debit:false,
      credit:false,
    }
 

    for (let i = 0; i < array.length; i++) {
      if (array[i].transactionType === JournalTransactionType.DEBIT) {
        transactions.push({
          style: "non",
          resultType: "MARGE_BRUTE",
          account: array[i].account,
          accountName:array[i].accountName,
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
          accountName:array[i].accountName,
          debit: null,
          credit: array[i].amount,
        });

        totalCreditAmount += parseFloat(array[i].amount);
      }

    
    }



    ProcessTfrResultHelper.calculateSold(totalCreditAmount, totalDebitAmount,sold)
  
    transactions.push({
        style: "to_bold",
        resultType: "MARGE_BRUTE",
        account: TFR_ACCOUNT.MARGE_BRUTE,
        accountName: "MARGE BRUTE",
        debit: !sold.debit ? sold.amount:'',
        credit: !sold.credit ? sold.amount:'',
      })


      return transactions
  }


}
