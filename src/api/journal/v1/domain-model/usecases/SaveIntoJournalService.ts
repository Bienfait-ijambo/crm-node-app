import { catchError } from "../../../../../shared/exceptions/CachError";
import { IJournalRepo } from "../../repository/IJournalRepo";
import { IJournalDto } from "../dto/IjournalDto";

export class SaveIntoJournalServiceUseCase {
  constructor(private repo: IJournalRepo) {
    this.repo = repo;
  }

  @catchError
  public async execute(journalResult: any, journalInput: IJournalDto[]) {
  
    const { identifiers } = journalResult;

    if (journalInput[0].serviceId > 0) {
      for (let i = 0; i < identifiers.length; i++) {
        await this.repo.saveIntoJournalService({
          journalId: identifiers[i].id,
          serviceId: journalInput[0].serviceId,
        });
      }
    }
  }
}
