import { AppDataSource } from "../../../../../infrastructure/typeorm/data-source";
import { IAggregateAccountRepo } from "../../../../aggregate-account-amount/repository/IAggregateAccountRepo";
import { IAccountRepo } from "../../repository/IAccountRepo";
import { CreateAccountInput } from "../dto/CreateAccountInput";
import { ICreateAccountInput } from "./interfaces/accountInterfaces";

export class CreateAccountUseCase{

    private aggregateAccountRepo:IAggregateAccountRepo
    private accountRepo:IAccountRepo

    constructor(accountRepo:IAccountRepo,aggregateAccountRepo:IAggregateAccountRepo){
        this.accountRepo = accountRepo;
        this.aggregateAccountRepo=aggregateAccountRepo
    }

    async execute(input:ICreateAccountInput){

    
       const dto= new CreateAccountInput(input)
  

       const result=await AppDataSource.transaction(async () => {

        const accountExist= await this.accountRepo.findAccountByCode(input.code,input.userId)


        if(accountExist!==null) throw new Error('Vous avez déjà enregistré ce compte !')
        
         const result = await this.accountRepo.createAccount(dto.getInput())
      
         await this.saveAccountInAggregateTable(result.id,input)
         
         return result
       
      })

      return result


     
    }


    /**
     * save account into aggregate_account_amount table
     */
    private async saveAccountInAggregateTable(accountId:number,input:ICreateAccountInput){

        await this.aggregateAccountRepo.recordData([{
            accountId:accountId,
            accountType:input.typeId,
            totalAmount:'0',
            userId:input.userId
       } ])
    }
}