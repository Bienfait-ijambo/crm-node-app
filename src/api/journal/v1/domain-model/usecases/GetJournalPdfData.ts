import { IJournalRepo } from "../../repository/IJournalRepo";
import { IJournalReportInput } from "./interfaces/journalInterfaces";

export class GetJournalPdfData {
  constructor(private repo: IJournalRepo) {
    this.repo = repo;
  }

  public async execute(input: IJournalReportInput) {
    const { journals } = await this.repo.GetJournalPdfData(input);

    return journals;
  }
}



