import { CreateGrossMarginUseCase } from "../domain-model/usecases/CreateGrossMargin";
import { CreateTfrResultUseCase } from "../domain-model/usecases/CreateTfrResult";
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
};
