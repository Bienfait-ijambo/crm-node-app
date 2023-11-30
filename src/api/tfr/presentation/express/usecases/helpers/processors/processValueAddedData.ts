import { JournalTransactionType, journalTransactionValType } from "../../../../../../../entities/Journal";
import { TFR_ACCOUNT, Tfr } from "../../../../../../../entities/Trf";
import { filterTfrData } from "../filterTfrData";




export class ProcessValueAdded{

    static getValuedAdded(TfrData:Tfr[]) {
        const array = filterTfrData(TfrData,'VALEUR_AJOUTER');
        const transactions = [];
        let totalDebitAmount = 0;
        let totalCreditAmount = 0;
        let sold = 0;
    
        for (let i = 0; i < array.length; i++) {
          if (array[i].transactionType === JournalTransactionType.DEBIT) {
            transactions.push({
              style: "non",
              resultType: "VALEUR_AJOUTER",
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
              resultType: "VALEUR_AJOUTER",
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
            resultType: "VALEUR_AJOUTER",
            account: TFR_ACCOUNT.VALEUR_AJOUTER,
            designation: "VALEUR_AJOUTER",
            debit: sold,
            credit: sold,
          })
    
    
          return transactions
      }

}