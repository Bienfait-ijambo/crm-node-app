import { JournalTransactionType } from "../../../../../entities/Journal";
import { generateCode } from "../../../../../shared/util/util";
import { isNumber } from "../../../../common/customer-decorators/Number";
import { IJournalDto } from "./IjournalDto";
import {  isValidTransactionStatus } from "./isValidTransaction";



export class CreateJournalDto  {

  @isNumber
  protected accountId: number;

  protected description: string;

  @isNumber
  protected massId: number;

  @isNumber
  protected amount: string;

  @isNumber
  @isValidTransactionStatus
  protected transactionType: number;

  protected income: string;

  protected expense: string;

  protected draw: boolean;

  private transactionCode: string;

  @isNumber
  protected userId: number;

  @isNumber
  protected projectId: number;

  @isNumber
  protected serviceId: number;



  
  protected createdAt: string;


  //
  public input: IJournalDto[] = [];

  constructor(arr: IJournalDto[]) {
  
   const transCode = this.generateTransCode();

  //  if(arr[0].serviceId===0 && arr[0].projectId===0) throw new Error('Veuillez selectionner un project ou service !')

    if(arr[0].description.length >= 5 && arr[0].description.length <= 40){

      for (let i = 0; arr.length > i; i++) {
        this.accountId = arr[i].accountId;
        this.massId = arr[i].massId;
        this.description = arr[i].description;
        this.createdAt = arr[i].createdAt;
        this.projectId = arr[i].projectId;
        this.serviceId = arr[i].serviceId;
        this.amount = arr[i].amount;
        this.transactionType = arr[i].transactionType;
        this.income = arr[i].income;
        this.transactionType = arr[i].transactionType;
        this.expense = arr[i].expense;
        this.userId = arr[i].userId;
        this.userId = arr[i].userId;
        this.draw=arr[i].draw,
  
  
        this.input.push({
          id: i,
          accountId: arr[i].accountId,
          massId: arr[i].massId,
          description: arr[i].description,
          createdAt :arr[i].createdAt,
          projectId: arr[i].projectId,
          serviceId: arr[i].serviceId,
          accountType: arr[i].accountType,
          amount: arr[i].amount,
          transactionType: arr[i].transactionType,
          income: arr[i].income,
          expense: arr[i].expense,
          draw: arr[i].draw,
          transactionCode: transCode,
          userId: arr[i].userId,
        });
      }

    }else{
      throw new Error('La description doit etre entre 5 et 40 charactès !')
    }

  
  }
  

  public getInsertInput(): IJournalDto[] {
  
    const { arr, error } = this.checkValidTransaction();

    if (error > 0) throw new Error("Transaction invalide");

    if (!this.isDebitSoldIsEqualToCredit(arr))
      throw new Error( "Le montant de debit doit être equal ou montant de credit !" );

      arr[arr.length - 1].draw=true

      const arrWithDateOrWithoutDate=this.addOrRemoveDateProperty(arr)
      
    return arrWithDateOrWithoutDate;
  }


  /**
   * remove CreatedAt property from array
   */
  private addOrRemoveDateProperty(arr: IJournalDto[]){

    const newArray=[]
    for(let i=0; i<arr.length; i++){
      const {createdAt,...restProps}=arr[i];

      if(createdAt.trim()!==''){
        newArray.push({createdAt,...restProps});
      }else{
      
        newArray.push({...restProps})
      }
    }
    return newArray
  }



 

  private checkValidTransaction(): { arr: IJournalDto[]; error: number } {
    const arr = this.input;
    let error = 0;
    const debit=JournalTransactionType.DEBIT
    const credit = JournalTransactionType.CREDIT


    for (let i = 0; arr.length > i; i++) {
      delete arr[i].id;

      if ( arr[i].transactionType === debit || arr[i].transactionType === credit ) {
        if (arr[i].transactionType === debit) {
          arr[i].income = arr[i].amount;
          arr[i].expense = "0";
        }

        if (arr[i].transactionType === credit) {
          arr[i].expense = arr[i].amount;
          arr[i].income = "0";
        }
      } else {
        error++;
      }
    }

    return {
      arr: arr,
      error: error,
    };
  }

  private isDebitSoldIsEqualToCredit(arr: IJournalDto[]): boolean {
    const debit=JournalTransactionType.DEBIT
  

    const debitTransactions: number[] = [];
    const creditTransactions: number[] = [];


    //separate transaction
    for (let i = 0; arr.length > i; i++) {
      if (arr[i].transactionType === debit) {
        debitTransactions.push(parseFloat(arr[i].amount));
      } else {
        creditTransactions.push(parseFloat(arr[i].amount));
      }
    }

    if (debitTransactions.length > 0 && creditTransactions.length > 0) {
      let totalDebit:number=0
      let totalCredit:number=0
      //get total
       totalDebit = debitTransactions.reduce( (acc, currValue) => acc + currValue ); 
       totalCredit = creditTransactions.reduce( (acc, currValue) => acc + currValue );

      return totalCredit === totalDebit ? true : false;
    } else {
      return false;
    }
  }



  private generateTransCode() {
    return generateCode();
  }
}
