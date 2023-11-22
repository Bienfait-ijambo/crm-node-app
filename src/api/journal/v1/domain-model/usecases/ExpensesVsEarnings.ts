import { IJournalRepo } from "../../repository/IJournalRepo";
import { IEarningVsExpenseInput } from "./interfaces/journalInterfaces";

export class ExpensesVsEarningsUseCase  {

 
  constructor( private repo: IJournalRepo) {
    this.repo = repo
  }

  public async execute(input:IEarningVsExpenseInput) {

    const result = await this.repo.expensesVsEarnings(input)
   
    return result;
  }
}
