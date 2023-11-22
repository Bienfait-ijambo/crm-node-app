import { MassRepo } from "../repository/TypeormMassRepo";
import { CreateMassUseCase } from "../domain-model/usecases/CreateMass";
import { UpdateMassUseCase } from "../domain-model/usecases/UpdateMass";

export const MassMutations= {
  createMass: async (root, {input}, { token}) => {
   
    const usecase = new CreateMassUseCase(MassRepo);
    const result= await usecase.execute(input);
    return result
  },
  updateMass: async (root, { input }, { token }) => {
    // verifyToken(token)

    const usecase = new UpdateMassUseCase(MassRepo);
    return await usecase.execute(input);
  },
};

