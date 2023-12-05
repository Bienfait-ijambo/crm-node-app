import { JournalTransactionType, journalTransactionValType } from "../../../../../../entities/Journal";
import { Tfr } from "../../../../../../entities/Trf";
import { ProcessNetOperatingIncome } from "./processors/ProcessNetOperatingIncome";
import { ProcessGrossMargin } from "./processors/processGrossMarginData";
import { ProcessGrossOperatingIncome } from "./processors/processGrossOperatingIncome";
import { ProcessNetResult } from "./processors/processNetResult";
import { ProcessProfitBeforeTax } from "./processors/processProfitBeforeTax";
import { ProcessValueAdded } from "./processors/processValueAddedData";


export interface ISold{
  amount:string
  debit:boolean
  credit:boolean
}
export class AggregateTfrProcessedData{

  private sold:ISold = {
    amount:'',
    debit:false,
    credit:false,
  }; 
    constructor(private array:Tfr[]){
        this.array = array;
    }


    execute(){
      const grossMargin=  ProcessGrossMargin.getGrossMargin(this.array)
        const valueAdded=ProcessValueAdded.getValuedAdded(this.array)
        const processGrossOperatingIncome=ProcessGrossOperatingIncome.getData(this.array)
       const netOperatingIncome= ProcessNetOperatingIncome.getData(this.array)
       const profitBeforeTax=ProcessProfitBeforeTax.getData(this.array)
       const netResult=ProcessNetResult.getData(this.array)
        
      return[
        ...grossMargin,
        ...valueAdded,
        ...processGrossOperatingIncome,
        ...netOperatingIncome,
        ...profitBeforeTax,
        ...netResult
      ]
    }
}


export class ProcessTfrResultHelper{
  
  static calculateSold(totalDebitAmount:number,totalCreditAmount:number,sold:ISold){
    
      // let transactionType: journalTransactionValType;

      if (totalDebitAmount > totalCreditAmount) {
        sold.amount += totalDebitAmount - totalCreditAmount;
        sold.debit=true
        // transactionType = JournalTransactionType.DEBIT;
      } else {
        sold.amount += totalCreditAmount - totalDebitAmount;
        sold.credit=true
        // transactionType = JournalTransactionType.CREDIT;
      }

     
  }
}