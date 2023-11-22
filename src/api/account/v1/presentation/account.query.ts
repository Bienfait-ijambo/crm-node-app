import { accountRepo } from "../repository/TypeormAccountRepo";
import { GetAccountUseCase } from "../domain-model/usecases/GetAccount";

export const accountQueries = {
  accounts: async (root, { input }, { token }) => {
   
    const usecase = new GetAccountUseCase(accountRepo);
    const { accounts, count, totalPages } = await usecase.execute(input);
    return { accounts, count, totalPages };
  },
};
