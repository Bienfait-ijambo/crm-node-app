import { partnerRepo } from "../repository/TypeormPartnerRepo";
import { CreatePartnerUseCase } from "../domain-model/usecases/CreatePartner";
import { UpdatePartnerUseCase } from "../domain-model/usecases/UpdatePartner";

export const partnerMutations = {
  createPartner: async (root, {input}, { token}) => {
    // verifyToken(token)

    const usecase = new CreatePartnerUseCase(partnerRepo);
    return await usecase.execute(input);
 
  },
  updatePartner: async (root, {input}, { token}) => {
    // verifyToken(token)
    const usecase = new UpdatePartnerUseCase(partnerRepo);
    return await usecase.execute(input);
 
  },
  
};

