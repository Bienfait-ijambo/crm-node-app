import { journalRepo } from "../../repository/TypeormJournalRepo";
import { GetBalanceUseCase } from "../../domain-model/usecases/GetBalance";
import { GetAllTransactionUseCase } from "../../domain-model/usecases/GetTransactions";
import { GetGeneralLedgerUseCase } from "../../domain-model/usecases/GetGeneralLedger";
import { ExpensesVsEarningsUseCase } from "../../domain-model/usecases/ExpensesVsEarnings";
import { GetTransactionDetailByAccount } from "../../domain-model/usecases/GetTransactionDetailByAccount";
import { GetPreviousTreasuryOp } from "../../domain-model/usecases/GetPreviousTreasuryOp";


export const journalQueries = {
    journals: async (root, {input}, { token}) => {
 
    const usecase = new GetAllTransactionUseCase(journalRepo);
    const {journals,count,totalPages}= await usecase.execute(input);
    return {journals,count,totalPages}
 
  },

  balance: async (root, {input}, { token}) => {

    const usecase = new GetBalanceUseCase(journalRepo);
    const  {journals,count,totalPages}= await usecase.execute(input);
    return {journals,count,totalPages}
 
  },
  generalLedger: async (root, {input}, { token}) => {
    const usecase = new GetGeneralLedgerUseCase(journalRepo);
    const result= await usecase.execute(input);
    return result
 
  },

  expensesVsEarnings: async (root,{input},{token}) => {
   
    const usecase = new ExpensesVsEarningsUseCase(journalRepo);
    const result= await usecase.execute(input);
   
    return result
 
  },


  transactionDetailByAccount: async (root,{input},{token}) => {
   
    const usecase = new GetTransactionDetailByAccount(journalRepo);
    const   { transactions, count, totalPages }= await usecase.execute(input);
   
    return { transactions, count, totalPages };
  },

  getPreviousTreasuryOp: async (root,{input},{token}) => {
   
    const usecase = new GetPreviousTreasuryOp(journalRepo);
    const result= await usecase.execute(input);
    return result
  }
  
  
  
};

