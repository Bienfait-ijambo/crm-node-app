import { IJournalRepo } from "../../repository/IJournalRepo";
import { IJournalSearchInput } from "./interfaces/journalInterfaces";

export class GetAllTransactionUseCase  {

 

  constructor( private repo: IJournalRepo) {
    this.repo = repo
  }

  public async execute(input:IJournalSearchInput) {

    const result = await this.repo.GetTransactions(input)

    return result;
  }
}
