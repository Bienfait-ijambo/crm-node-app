import { JournalTransactionType } from "../../../../../entities/Journal";



export class TransactionType{
    protected getTransaction() {
        const debit = JournalTransactionType.DEBIT;
        const credit = JournalTransactionType.CREDIT;
        return { debit: debit, credit: credit };
      }
}