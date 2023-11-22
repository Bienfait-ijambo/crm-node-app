import { IJournalRepo } from "../../repository/IJournalRepo";
import { journalRepo } from "../../repository/TypeormJournalRepo";
import { CreateGetBalanceInput } from "../dto/CreateBalanceInput";
import { IBalanceReportInput } from "./interfaces/journalInterfaces";

export class GetBalanceUseCase  {

 
  constructor( private repo: IJournalRepo) {
    this.repo = repo
  }

  public async execute(input:IBalanceReportInput) {

    const dto=new CreateGetBalanceInput(input)
    const result = await this.repo.getBalance(dto.getBilanInput())

    return result;
  }
}
