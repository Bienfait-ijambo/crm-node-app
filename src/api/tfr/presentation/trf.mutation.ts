import { CreateGrossMarginUseCase } from "../domain-model/usecases/CreateGrossMargin";
import { tfrRepo } from "../repository/TypeormTFRRepo";


export const TfrMutations= {
  createGrossMargin: async (root, {input}, { token}) => {
    const usecase = new CreateGrossMarginUseCase(tfrRepo);
await usecase.execute(input);
    return {message:"ok"}
  },
 
};

