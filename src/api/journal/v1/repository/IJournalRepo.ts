import { IJournalDto } from "../domain-model/dto/IjournalDto";
import {  IBalanceReportInput, ICreateGeneralLedgerInput, IEarningVsExpenseInput,  IJournalReportInput, IJournalSearchInput, IJournalServiceInput, IPreviousTreasureOp, ITransactionDetailInput, IUpdateJournalInput } from "../domain-model/usecases/interfaces/journalInterfaces";
import { Journal } from "../../../../entities/Journal";
import { InsertResult } from "typeorm/query-builder/result/InsertResult";
import { ApiResponse } from "../../../common/types/apiResponse";

export interface IExpenseVsEarnings{
  totalExpenses: number;
  totalEarnings: number;
}



export interface IJournalRepo{

  
  recordTransaction(input:IJournalDto[]):Promise<InsertResult>

  EditTransaction(input:IUpdateJournalInput):Promise<IUpdateJournalInput>

  GetTransactions(input:IJournalSearchInput):Promise<ApiResponse<'journals',Journal[]>>

  GetJournalPdfData(input:IJournalReportInput):Promise<{ journals: Journal[] }>

  getBalance(input:IBalanceReportInput):Promise<ApiResponse<'journals',Journal[]>>

  getGeneralLedger(input:ICreateGeneralLedgerInput)

  expensesVsEarnings(input: IEarningVsExpenseInput) : Promise<IExpenseVsEarnings>


  saveIntoJournalService(input:IJournalServiceInput): Promise<void>

  getTransactionDetailByAccount(input:ITransactionDetailInput)

  /**
   * 
   * @param input 
   * get previous treasury account operations
   */
  getPreviousTreasuryOp(input:IPreviousTreasureOp)

 
}
