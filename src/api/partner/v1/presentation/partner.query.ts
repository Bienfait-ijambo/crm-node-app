import { partnerRepo } from "../repository/TypeormPartnerRepo";
import { GetPartnerUserCase } from "../domain-model/usecases/GetPartner";

export const partnerQueries = {
  partners: async (root, {name,userId,page}, { token}) => {
    // verifyToken(token)
  
    
    const usecase = new GetPartnerUserCase(partnerRepo);
    const {partners,count,totalPages}= await usecase.execute(name,userId,page);
    return {partners,count,totalPages}
  },
  
};

