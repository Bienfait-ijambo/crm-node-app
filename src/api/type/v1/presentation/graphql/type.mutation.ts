import { TypeRepo } from "../../repository/TypeormTypeRepo";
import { CreateTypeUseCase } from "../../domain-model/usecases/CreateType";
import { UpdateTypeUseCase } from "../../domain-model/usecases/UpdateType";

export const typeMutations= {
  createType: async (root, {input}, { token}) => {
  

      const usecase = new CreateTypeUseCase(TypeRepo);
      const result= await usecase.execute(input);
      return result

  
  
  },
  updateType: async (root, { input }, { token }) => {

    const usecase = new UpdateTypeUseCase(TypeRepo);
    return await usecase.execute(input);
  },
};

