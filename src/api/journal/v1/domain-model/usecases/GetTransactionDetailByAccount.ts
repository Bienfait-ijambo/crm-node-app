import { IJournalRepo } from "../../repository/IJournalRepo";
import { CreateTransactionDetailByAccountDto } from "../dto/CreateTransactionDetailByAccountDto";
import { ITransactionDetailInput } from "./interfaces/journalInterfaces";



export class GetTransactionDetailByAccount{


    constructor(private repo: IJournalRepo) {
        this.repo = repo;
      }

      async execute(input:ITransactionDetailInput){
      
        const result= await this.repo.getTransactionDetailByAccount(input)
        return result
      }
    
}