import { GetServicePaymentUserCase } from "../domain-model/usecases/GetServicePayment";
import { GetServiceUserCase } from "../domain-model/usecases/GetServices";
import { serviceRepo } from "../repository/TypeormServiceRepo";

export const ServiceQueries = {
  services: async (root, {name,userId,page}, { token}) => {
    
    const usecase = new GetServiceUserCase(serviceRepo);
    const {services,count,totalPages}= await usecase.execute(name,userId,page);
    return {services,count,totalPages}
  },

  servicesPayment: async (root, {input}, { token}) => {
  
    const usecase = new GetServicePaymentUserCase(serviceRepo);
    const {services,count,totalPages}= await usecase.execute(input);
    return {services,count,totalPages}
  },


  
  
};

