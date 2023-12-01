import { GetPeriodTfrResultUseCase } from "../domain-model/usecases/GetPeriodTfrResult";
import { tfrRepo } from "../repository/TypeormTFRRepo";


export const TfrQueries = {
  getPeriodicTfrResult: async (root, {input}, { token}) => {
    
    const usecase = new GetPeriodTfrResultUseCase(tfrRepo);
    const {periodicData,count,totalPages}= await usecase.execute(input);
    return {periodicData,count,totalPages}
  },

};

