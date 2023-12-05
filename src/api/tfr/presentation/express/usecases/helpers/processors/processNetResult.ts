import { JournalTransactionType, journalTransactionValType } from "../../../../../../../entities/Journal";
import { TFR_ACCOUNT, Tfr } from "../../../../../../../entities/Trf";
import { ProcessTfrResultHelper } from "../aggregateProcessedTfrData";
import { filterTfrData } from "../filterTfrData";



export class ProcessNetResult{


    static getData(TfrData:Tfr[]) {
        const array = filterTfrData(TfrData,'RESULTAT_NET');
        const transactions = [];
        let totalDebitAmount = 0;
        let totalCreditAmount = 0;
        let sold = {
          amount:'',
          debit:false,
          credit:false
        };
    
        for (let i = 0; i < array.length; i++) {
          if (array[i].transactionType === JournalTransactionType.DEBIT) {
            transactions.push({
              style: "non",
              resultType: "RESULTAT_NET",
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
              resultType: "RESULTAT_NET",
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
            resultType: "RESULTAT_NET",
            account: TFR_ACCOUNT.RESULTAT_NET,
            accountName: "RESULTAT_NET",
            debit: !sold.debit ? sold.amount:'',
            credit: !sold.credit ? sold.amount:'',
          })
    
    
          return transactions
      }
      
}