import { enumAccountType } from "../../../../entities/AccountType";
import { JournalTransactionType } from "../../../../entities/Journal";
import { enumMassType } from "../../../../entities/Mass";
import { IJournalDto } from "../../../journal/v1/domain-model/dto/IjournalDto";
import { returnTypeAggregateAccount } from "../../repository/IAggregateAccountRepo";

export interface IProcessBilanTypes{
     arr: IJournalDto[], 
     i: number,
     aggregateInput: returnTypeAggregateAccount[],
     returnAggregateInput:any[],
     error:any[]
}


export class ProcessBilanTypes{

 


    public processPassifAccount({arr,i,aggregateInput,returnAggregateInput,error}:IProcessBilanTypes) {
        if (arr[i].transactionType == JournalTransactionType.CREDIT && arr[i].accountType == enumAccountType.PASSIF) {
            //add
            this.addAccountAmount({arr,i,aggregateInput,returnAggregateInput,error})


        } else if (arr[i].transactionType == JournalTransactionType.DEBIT && arr[i].accountType == enumAccountType.PASSIF) {
            //decrease

            this.reduceAccountAmount({arr,i,aggregateInput,returnAggregateInput,error})

        }
    }


    public processActifAccount( {arr,i,aggregateInput,returnAggregateInput,error}:IProcessBilanTypes) {

        if ( arr[i].transactionType === JournalTransactionType.DEBIT && arr[i].massId === enumMassType.TRESORERIE_ACTIF ) {
            //add
            this.addAccountAmount({arr,i,aggregateInput,returnAggregateInput,error})

          } else if ( arr[i].transactionType == JournalTransactionType.CREDIT && arr[i].massId == enumMassType.TRESORERIE_ACTIF ) {
            //decrease
            this.reduceAccountAmount({arr,i,aggregateInput,returnAggregateInput,error})
          }
       
      }




      /**
       * 
       * @param arr 
       * @param i 
       * @param aggregateInput 
       * @param returnAggregateInput 
       */
      private addAccountAmount({arr,i,aggregateInput,returnAggregateInput,error}:IProcessBilanTypes){
        if (aggregateInput[i].accountId === arr[i].accountId) {
            returnAggregateInput[i].totalAmount += parseFloat(arr[i].amount);
          }
      }


      /**
       * 
       * @param arr 
       * @param i 
       * @param aggregateInput 
       * @param returnAggregateInput 
       * @param error 
       */
      private reduceAccountAmount({arr,i,aggregateInput,returnAggregateInput,error}:IProcessBilanTypes ){

      
        if (aggregateInput[i].accountId === arr[i].accountId) {
    
            if(returnAggregateInput[i].totalAmount >=parseFloat(arr[i].amount)){
                returnAggregateInput[i].totalAmount -= parseFloat(arr[i].amount);
            }else{
                error.push({error:""})
            }

        }

      }
      
}