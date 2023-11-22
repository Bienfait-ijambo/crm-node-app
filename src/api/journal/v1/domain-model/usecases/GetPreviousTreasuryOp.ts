


import { IJournalRepo } from "../../repository/IJournalRepo";
import { IPreviousTreasureOp } from "./interfaces/journalInterfaces";

export class GetPreviousTreasuryOp  {

 
  constructor( private repo: IJournalRepo) {
    this.repo = repo
  }

  public async execute(input:IPreviousTreasureOp) {

    const result = await this.repo.getPreviousTreasuryOp(input)

    return result;
  }
}
