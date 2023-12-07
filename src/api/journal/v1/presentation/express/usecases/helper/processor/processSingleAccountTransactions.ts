

import { JournalTransactionType } from "../../../../../../../../entities/Journal";


export interface ISingleTransaction {
  id: number;
  amount: string;
  transactionType: number;
  description: string;
  createdAt: string;
}

 export class ProcessSingleAccountTransaction {
  static getDebitOperation(array: Array<any>) {
    const filteredOperations = array.filter(
      (transaction) =>
        transaction.transactionType === JournalTransactionType.DEBIT
    );
    return filteredOperations;
  }

  static getCreditOperation(array: Array<any>) {
    const filteredOperations = array.filter(
      (transaction) =>
        transaction.transactionType === JournalTransactionType.CREDIT
    );
    return filteredOperations;
  }

  static execute(array: Array<any>) {
    const debitTransaction =
      ProcessSingleAccountTransaction.getDebitOperation(array);
    const creditTransaction =
      ProcessSingleAccountTransaction.getCreditOperation(array);
    const newArray = [];

    // push all debit operations
    for (let i = 0; i < debitTransaction.length; i++) {
      newArray.push({
        debit: {
          date: array[i]?.createdAt,
          description: array[i]?.description,
          amount: array[i]?.amount,
        },
        credit: {
          date: "",
          description: "",
          amount: "",
        },
      });
    }

    for (let j = 0; j < newArray.length; j++) {
      const transaction = creditTransaction.pop();
      newArray[j].credit = {
        date:transaction?.createdAt,
        description: transaction?.description,
        amount: transaction?.amount,
      };
    }

    return newArray;
  }
}
