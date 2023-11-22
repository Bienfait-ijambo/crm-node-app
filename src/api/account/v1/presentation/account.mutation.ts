import { accountRepo } from "../repository/TypeormAccountRepo";
import { CreateAccountUseCase } from "../domain-model/usecases/CreateAccount";
import { UpdateAccountUseCase } from "../domain-model/usecases/UpdateAccount";
import { aggregateAccountRepo } from "../../../aggregate-account-amount/repository/TypeormAggregateAccount";

export const accountMutations= {
  createAccount: async (root, {input}, { token}) => {
   
    const usecase = new CreateAccountUseCase(accountRepo,aggregateAccountRepo);
    const result= await usecase.execute(input);
    return result
  },
  updateAccount: async (root, { input }, { token }) => {
    

    const usecase = new UpdateAccountUseCase(accountRepo);
    return await usecase.execute(input);
  },
};

