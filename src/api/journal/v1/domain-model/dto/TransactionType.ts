import { JournalTransaction } from "./isValidTransaction";

export class TransactionType{
    protected getTransaction() {
        const debit = JournalTransaction.DEBIT;
        const credit = JournalTransaction.CREDIT;
        return { debit: debit, credit: credit };
      }
}