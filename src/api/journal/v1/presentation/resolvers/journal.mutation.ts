import { journalRepo } from "../../repository/TypeormJournalRepo";
import { EditTransactionUseCase } from "../../domain-model/usecases/EditTransaction";
import { RecordTransactionUseCase } from "../../domain-model/usecases/RecordTransaction";
import { aggregateAccountRepo } from "../../../../aggregate-account-amount/repository/TypeormAggregateAccount";
import { serviceRepo } from "../../../../service/v1/repository/TypeormServiceRepo";
import { ProjectRepo } from "../../../../projet/v1/repository/TypeormProjectRepo";

export const journalMutations = {
  recordTransaction: async (root, { input }, { token }) => {
   
    const usecase = new RecordTransactionUseCase(journalRepo,aggregateAccountRepo,serviceRepo,ProjectRepo);
     await usecase.execute(input);

    return {
      id: "",
      description: "Transaction effectué avec succès !",
    };
  },
  editTransaction: async (root, { input }, { token }) => {
    const usecase = new EditTransactionUseCase(journalRepo);
    return await usecase.execute(input);
  },
};

