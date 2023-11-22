import { IJournalRepo } from "../../repository/IJournalRepo";
import { ICreateGeneralLedgerInput } from "./interfaces/journalInterfaces";

export class GetGeneralLedgerUseCase {
  constructor(private repo: IJournalRepo) {
    this.repo = repo;
  }

  async execute(input: ICreateGeneralLedgerInput) {
    
    if ( input.accountId.length > 0 && input.startDate !== "" && input.endDate !== "" ) {
      const result = await this.repo.getGeneralLedger(input);

      return result;
    } else {
      return [];
    }
  }
}
