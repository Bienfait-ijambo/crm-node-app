import { JournalTransactionType } from "../../../../../entities/Journal";
import { enumMassType } from "../../../../../entities/Mass";

import { IJournalDto } from "../../../../journal/v1/domain-model/dto/IjournalDto";
import { IProjectRepo } from "../../repository/IProjectRepo";

export class CreateProjectPaymentUseCase {

     private errorMessage:string=''

    constructor(private repo: IProjectRepo) {
        this.repo = repo;
    }

    // @catchError
     async execute(journalInput: IJournalDto[]){
        
        
        //checks if journalInput has projectId by checking if id > 0
        if (journalInput[0].projectId > 0) {


            let accountAmount = 0;
           

            for (let i = 0; i < journalInput.length; i++) {
                const item = journalInput[i];

                if ( item.transactionType === JournalTransactionType.CREDIT && item.massId === enumMassType.TRESORERIE_ACTIF ) {
                    accountAmount += parseFloat(item.amount);
                }
                
                 
            }
          
            await this.createProjectPayment(journalInput, accountAmount);

        
            return this.errorMessage
            
        }else{
            return this.errorMessage
        }
    }

  

    private async createProjectPayment(journalInput: IJournalDto[], accountAmount: number) {
        const input = {
            projectId: journalInput[0].projectId,
            amount: journalInput[0].amount,
            userId: journalInput[0].userId,
        };

        const {paidAmount,amount}=await this.getProjectAmount(input.projectId,input.userId)

        const restAmount = amount-paidAmount
      
        if(accountAmount <=restAmount ){
        
            const getTotalPaidAmount=restAmount+accountAmount
           
            //make payment
            await this.processProjectPayment(journalInput,paidAmount,accountAmount)

            if(getTotalPaidAmount===amount){
                //change project status
                await  this.repo.changeProjectStatus(journalInput[0].projectId)
            }
        }else{
           
            this.errorMessage='INVALID_AMOUNT'
        }
 
       
    }


    private async processProjectPayment(journalInput: IJournalDto[],paidAmount: number,accountAmount:number) {
        const input = {
            projectId: journalInput[0].projectId,
            amount: journalInput[0].amount,
            userId: journalInput[0].userId,
        };

         this.repo.createProjectPayment(input);
         this.repo.updatePaidAmountField((paidAmount +accountAmount),input.projectId)
    }


  



    /**
     * 
     * @param projectId 
     * @param userId 
     * get project amount to be paid and paidAmount
     */
    private  async getProjectAmount(projectId:number,userId:number){

        const result= await this.repo.getProjectAmount(projectId,userId)
        //get paidAmount 
        const paidAmount=parseFloat(result.paidAmount)

        //get amount to be paid
        const amount=parseFloat(result.amount)
        return {paidAmount,amount}
    }


}
