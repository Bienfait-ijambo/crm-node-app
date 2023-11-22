import { aggregateAccountRepo } from "../repository/TypeormAggregateAccount";
import { GetTreasuryAccountUseCase } from "../usecases/GetTreasuryAccount";

export const aggregateAccountQuery={
    treasuryAccounts: async (root, {input}, { token}) => {
 
        const usecase = new GetTreasuryAccountUseCase(aggregateAccountRepo);
        const result= await usecase.execute(input);
        return result
     
      },
    
}