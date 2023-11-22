import { AppDataSource } from "../../../../../infrastructure/typeorm/data-source";
import { CreateAggregateAccountDto } from "../../../../aggregate-account-amount/domain-model/dto/CreateAggregateAccountDto";
import { IAggregateAccountRepo } from "../../../../aggregate-account-amount/repository/IAggregateAccountRepo";
import { IServiceRepo } from "../../../../service/v1/repository/IServiceRepo";
import { IJournalRepo } from "../../repository/IJournalRepo";
import { CreateJournalDto } from "../dto/CreateJournalDto";
import { IJournalDto } from "../dto/IjournalDto";
import { CreateServicePaymentUseCase } from "../../../../service/v1/domain-model/usecases/CreateServicePayment";
// import { SaveIntoJournalServiceUseCase } from "./SaveIntoJournalService";
import { catchError } from "../../../../../shared/exceptions/CachError";
import { CreateProjectPaymentUseCase } from "../../../../projet/v1/domain-model/usecases/CreateProjectPayment";
import { IProjectRepo } from './../../../../projet/v1/repository/IProjectRepo';

export class RecordTransactionUseCase {

  private journalRepo: IJournalRepo;
  private aggragateAccountRepo: IAggregateAccountRepo;
  private serviceRepo:IServiceRepo
  private projectRepo:IProjectRepo

  constructor(journalRepo: IJournalRepo, aggragateAccountRepo: IAggregateAccountRepo,serviceRepo:IServiceRepo,projectRepo:IProjectRepo) {
    this.journalRepo = journalRepo;
    this.aggragateAccountRepo = aggragateAccountRepo;
    this.serviceRepo=serviceRepo
    this.projectRepo = projectRepo
  }

  //  @catchError
  public async execute(journalInput: IJournalDto[]) {

    
  
    const journalDto = new CreateJournalDto(journalInput);

    const journalInsertInput = journalDto.getInsertInput();

    const aggrInput = new CreateAggregateAccountDto();


    const result = await AppDataSource.transaction(async () => {

      const doesAccountsExist = await this.checkIfAccountExists(aggrInput, journalInput);
  

      if (doesAccountsExist.length > 0) {
        //update[reduce or add]
        const {returnAggregateInput:inputToUpdate, error,serviceStatus}= aggrInput.getAggregateUpdateInput(journalInput, doesAccountsExist);
       
       
        if (error.length > 0)
          throw new Error("Oops ! vous ne disposez pas suffisament des fonds dans votre Caisse/Banque !");

        //update 

        // await this.updateIntoAggregateAccount(inputToUpdate)
      
        //  service payment
          this.createServicePayment(journalInput,serviceStatus)

          this.journalRepo.recordTransaction(journalInsertInput);

  
      } else {
        //insert
        // await this.saveIntoAggregateAccountTable(aggrInput, journalInput);

         this.journalRepo.recordTransaction(journalInsertInput);
      }


    })
    return result


  }

  @catchError
  private async checkIfAccountExists(aggrInput: CreateAggregateAccountDto, journalInput: IJournalDto[]) {
    const doesAccountsExist = await this.aggragateAccountRepo.checkIfAccountExists(aggrInput.getAccountIds(journalInput), journalInput[0].userId);
    return doesAccountsExist;
  }

  // @catchError
  // private async saveIntoAggregateAccountTable(aggrInput: CreateAggregateAccountDto, journalInput: IJournalDto[]) {
  //   await this.aggragateAccountRepo.recordData(
  //     aggrInput.getInsertInput(journalInput)
  //   );


  // }




  /**
   * 
   * @param journalInput 
   * @param serviceStatus 
   */
  
  private async createServicePayment(journalInput: IJournalDto[],serviceStatus:number){
   const usecase= new CreateServicePaymentUseCase(this.serviceRepo)
   await usecase.execute(journalInput)
 
  }






  // private async updateIntoAggregateAccount(inputToUpdate:any){
  //   for (let i = 0; i < inputToUpdate.length; i++) {
  //     await this.aggragateAccountRepo.updateData(inputToUpdate[i]);
  //   }
  // }


  
  // private async createProjectPayment(journalInput: IJournalDto[]){
  //   const usecase=new CreateProjectPaymentUseCase(this.projectRepo)
  //   const result=await usecase.execute(journalInput)

  //   return result
  // }


  
  
  
}
