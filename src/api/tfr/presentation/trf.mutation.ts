import { CreateGrossMarginUseCase } from "../domain-model/usecases/CreateGrossMargin";
import { CreateTfrResultUseCase } from "../domain-model/usecases/CreateTfrResult";
import { CreatePeriodicTfrResult } from "../domain-model/usecases/createPeriodicTfrResult";
import { tfrRepo } from "../repository/TypeormTFRRepo";

export const TfrMutations = {
  createGrossMargin: async (root, { input }, { token }) => {
    const usecase = new CreateGrossMarginUseCase(tfrRepo);
    await usecase.execute(input);
    return { message: "ok" };
  },

  CreateTfrResult: async (root, { input }, { token }) => {
    const usecase = new CreateTfrResultUseCase(tfrRepo);
    await usecase.execute(input);
    return { message: "ok" };
  },

  createPeriodicTfrResult: async (root, { input }, { token }) => {
    const usecase = new CreatePeriodicTfrResult(tfrRepo);
    await usecase.execute(input);
    return { message: "ok" };
  },
  
};


