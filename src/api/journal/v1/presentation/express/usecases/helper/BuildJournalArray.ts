import { JournalTransactionType } from "../../../../../../../entities/Journal";
import { dateToIsoString } from "../../../../../../../shared/util/dateUtils";
import { formatAmountToUS } from "../../../../../../../shared/util/util";
import {  IJournalReportApiRes, IJournalTransaction } from "../interfaces/journalReportInterface";




export abstract  class BuildJournalArray {
  
   private getDebitOperation(journal: IJournalReportApiRes[], index: number, newJournalArray: IJournalTransaction[]) {
        if (journal[index].transactionType === JournalTransactionType.DEBIT) {
            const debit = {
              accountCode: journal[index].account.code,
              amount: formatAmountToUS(journal[index].amount),
              name: journal[index].account.name,
              date:dateToIsoString(journal[index].createdAt)
            };
      
            const credit = {
              accountCode: "",
              amount: "",
              name: "",
            };
      
            newJournalArray.push({
            idOp: journal[index].transactionCode,
              description: journal[index].description,
              transactionCode:journal[index].transactionCode,
              operations: [{ debit: debit, credit: credit }],
            });
          }
    }
   private getCreditOperation(journal: IJournalReportApiRes[], index: number, newJournalArray: IJournalTransaction[]) {

        if (journal[index].transactionType === JournalTransactionType.CREDIT) {
            const debit = {
              accountCode: "",
              amount: "",
              name: "",
              date:""
            };
      
            const credit = {
              accountCode: journal[index].account.code,
              amount: formatAmountToUS(journal[index].amount),
              name: journal[index].account.name,
            };
      
            newJournalArray.push({
              idOp: journal[index].transactionCode,
              description: journal[index].description,
              transactionCode:journal[index].transactionCode,
              operations: [{ debit: debit, credit: credit }],
            });
          }
    }




    private getTransaction(newJournal:IJournalTransaction[],index:number,journal: IJournalReportApiRes[]): IJournalTransaction[]{
        const getOperation = newJournal.filter( (operation) => operation.idOp == journal[index].transactionCode );
    return getOperation
    }


    private pushDebitOperationToTransaction(newJournal:any[],index:number,journal: IJournalReportApiRes[],getOperation:IJournalTransaction[]){
        if (journal[index].transactionType === JournalTransactionType.DEBIT) {
    
            const debit = {
              accountCode: journal[index].account.code,
              amount: formatAmountToUS(journal[index].amount),
              name: journal[index].account.name,
              date:journal[index].createdAt
            };
  
            const credit = {
              accountCode: "",
              amount: "",
              name: "",
            };
  
            const updateOperation = getOperation[0].operations.push({
              debit: debit,
              credit: credit,
            });
  
            newJournal.push(updateOperation);
          }
    }


    private pushCreditOperationToTransaction(newJournal:any[],index:number,journal: IJournalReportApiRes[],getOperation:IJournalTransaction[]){
        if (journal[index].transactionType === JournalTransactionType.CREDIT) {
            const debit = {
              accountCode: "",
              amount: "",
              name: "",
              date:""
            };
  
            const credit = {
              accountCode: journal[index].account.code,
              amount: formatAmountToUS(journal[index].amount),
              name: journal[index].account.name,
            };
  
            const updateOperation = getOperation[0].operations.push({
              debit: debit,
              credit: credit,
            });
  
            newJournal.push(updateOperation);
          }
    }


    protected  getJournalTransformData(journalData:IJournalReportApiRes[]) {
        const journal = journalData
    
        const newJournal = [];
    
        for (let i = 0; i < journal.length; i++) {
          if (newJournal.length > 0) {
           
            const getOperation =this.getTransaction(newJournal,i,journal)

            if(getOperation.length > 0){
    
                
                this.pushDebitOperationToTransaction(newJournal,i,journal,getOperation)
      
                this.pushCreditOperationToTransaction(newJournal,i,journal,getOperation)
    
            }else{
                //not found 
                this.getDebitOperation(journal, i, newJournal);
                this.getCreditOperation(journal, i, newJournal);
            }
           
    
          } else {
            this.getDebitOperation(journal, i, newJournal);
            this.getCreditOperation(journal, i, newJournal);
          }
        }
    
        
        return newJournal;
      }



   
}