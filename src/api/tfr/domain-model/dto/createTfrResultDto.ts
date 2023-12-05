import { JournalTransactionType } from "../../../../entities/Journal";
import { TfrResultAccount } from "../../../../entities/TfrResultAccount";
import { Tfr, resultTypeNameType } from "../../../../entities/Trf";
import { AccountName, TfrAccount } from "../../../../shared/types/brandTypes";
import { ValueAddedInput } from "../usecases/interfaces/tfr.interfaces";

/**
 * create other tff result expect dto
 */
export class CreateTfrResultDto {
  private input: ValueAddedInput[];

  constructor(input: ValueAddedInput[]) {
    this.input = input;
    if (!this.isValid()) {
      throw new Error("Désolez, le montant doit être supérieur à zero !");
    }
  }

  private isValid() {
    let error = 0;
    for (let i = 0; i < this.input.length; i++) {
      if (this.input[i].amount < 0) {
        error++;
      }
    }

    return error > 0 ? false : true;
  }



  
    getTFRValueAddedResult(code:TfrAccount,resultType:resultTypeNameType) {
      const { transactionType, amount } = this.calculateValueAddedResult();
      return new TfrResultAccount(
        code,
        transactionType,
        resultType,
        amount.toString(),
        this.input[0].periodCode,
        this.input[0].userId
      );
    }

    private calculateValueAddedResult() {
      let totalDebitAmount = 0;
      let totalCreditAmount = 0;
      let transactionType
      let sold=0

      const debitAccounts=this.input.filter((account)=>account.transactionType===JournalTransactionType.DEBIT)
      const creditAccounts=this.input.filter((account)=>account.transactionType===JournalTransactionType.CREDIT)

      debitAccounts.forEach(account=>{
        totalCreditAmount+=account.amount
      })

      creditAccounts.forEach(account=>{
        totalDebitAmount+=account.amount
      })


      if(totalDebitAmount > totalCreditAmount){
        sold += totalDebitAmount - totalCreditAmount;
        transactionType = JournalTransactionType.DEBIT;
      }else{
        sold +=   totalCreditAmount-totalDebitAmount;
        transactionType = JournalTransactionType.CREDIT;
      }


      return { transactionType: transactionType, amount: sold };
      
    }

  getValueAddedInput():Tfr[] {
    const input=[]

    for (let i = 0; i < this.input.length; i++) {
       input.push(new Tfr(
        this.input[i].account,
        this.input[i].transactionType,
        this.input[i].accountName,
        this.input[i].resultType,
        this.input[i].amount.toString(),
        this.input[i].periodCode,
        this.input[i].userId
      ),)
      }
      return input
  }
}
