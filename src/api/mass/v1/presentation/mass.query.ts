
import { MASSES } from "../../../../entities/Mass";
import { GetMassUseCase } from "../domain-model/usecases/GetMass";
import { MassRepo } from "../repository/TypeormMassRepo";

export const massQueries= {
  masses: async (root, {input}, { token}) => {
   
    const usecase = new GetMassUseCase(MassRepo);
    const result= await usecase.execute();
    return result
  },
 
};

