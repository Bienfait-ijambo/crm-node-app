import { JournalTransactionType } from "../../../../../../../../entities/Journal";
import {  formatDateToFr } from "../../../../../../../../shared/util/dateUtils";

export interface ISingleTransaction {
  id: number;
  amount: string;
  transactionType: number;
  description: string;
  createdAt: string;
}

export interface IProcessedSingleTransaction {
  debit: {
    date: string;
    description: string;
    amount: string;
  };
  credit: {
    date: string;
    description: string;
    amount: string;
  };
}

export interface ISingleTransactionSold {
  debit: {
    amount: string;
  };
  credit: {
    amount: string;
  };
}
export class ProcessSingleAccountTransaction {
  constructor(private array: Array<ISingleTransaction>) {
    this.array = array;
  }

  private getDebitOperation() {
    const filteredOperations = this.array.filter(
      (transaction) =>
        transaction.transactionType === JournalTransactionType.DEBIT
    );
    return filteredOperations;
  }

  private getCreditOperation() {
    const filteredOperations = this.array.filter(
      (transaction) =>
        transaction.transactionType === JournalTransactionType.CREDIT
    );
    return filteredOperations;
  }

  execute() {
    const { transactions, accountSold } = this.createSold();

    return new Promise<{
      transactions: Array<IProcessedSingleTransaction>;
      accountSold: Array<ISingleTransactionSold>;
    }>((resolve) => {
      resolve({ transactions, accountSold });
    });
  }

  /**
   *
   */
  private createSold() {
    const accountSold = [
      {

        total:0,
        debit: {
          
          amount: "-------",
        },
        credit: {
          amount: "-------",

        },
      },
    ];

    const { transactions, totalCreditAmount, totalDebitAmount } =
      this.mergeDebitAndCreditTransactions();
    if (totalDebitAmount > totalCreditAmount) {
      const sold = totalDebitAmount - totalCreditAmount;
      accountSold[0].credit.amount = sold + " (SD)";
      accountSold[0].debit.amount =  "-------";
      accountSold[0].total=totalDebitAmount

    } 
    
    if(totalDebitAmount < totalCreditAmount){
      const sold =   totalCreditAmount-totalDebitAmount;
      accountSold[0].debit.amount = sold + " (SC)";
      accountSold[0].credit.amount =  "-------";
      accountSold[0].total=totalCreditAmount
    }

    return { transactions, accountSold };
  }

  private mergeDebitAndCreditTransactions() {
    const debitTransaction = this.getDebitOperation();
    const creditTransaction = this.getCreditOperation();

    const transactions: Array<IProcessedSingleTransaction> = [];
    let totalDebitAmount: number=0
     let totalCreditAmount: number = 0;

    // push all debit operations
    for (let i = 0; i < debitTransaction.length; i++) {
      totalDebitAmount += this.array[i]?.amount !=='undefined' ?  parseFloat(this.array[i].amount):0;
      transactions.push({
        debit: {
          date: formatDateToFr(this.array[i]?.createdAt),
          description: this.array[i]?.description,
          amount: this.array[i]?.amount,
        },
        credit: {
          date: "",
          description: "",
          amount: "",
        },
      });
    }

    for (let j = 0; j < transactions.length; j++) {
      const transaction = creditTransaction.pop();

      totalCreditAmount += typeof transaction?.amount !=='undefined' ? parseFloat(transaction?.amount):0;

      transactions[j].credit = {
        date: formatDateToFr(transaction?.createdAt),
        description: transaction?.description,
        amount: transaction?.amount,
      };
    }

    return { transactions, totalCreditAmount, totalDebitAmount };
  }
}
