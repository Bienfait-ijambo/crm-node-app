
import { TypeRepo } from "../../repository/TypeormTypeRepo";
import { existingAccountTypes } from "../../../../../entities/AccountType";
import { GetBilanUseCase } from "../../domain-model/usecases/GetBilan";
import { CreateAccountResultUseCase } from "../../domain-model/usecases/CreateAccountResult";
import { GetAccountTypesWithMass } from "../../domain-model/usecases/getAccountTypesWithMasses";

export const typeQueries= {
    types: async (root, {input}, { token}) => {
      
      return[]
     
      // const usecase = new GetTypeUseCase(TypeRepo);
      // const result= await usecase.execute();
      // return result
    },

    accountTypes: async (root, args, { token}) => {
      const useCase=new GetAccountTypesWithMass(TypeRepo)
      const result= await useCase.execute();
      return result

      // return existingAccountTypes
    },
    
    bilan: async (root, {input}, { token}) => {
     
      const usecase=new GetBilanUseCase(TypeRepo)
      const {masses, count, totalPages}= await usecase.execute(input)
      return {masses, count, totalPages}
    
    },

    getAccountResult: async (root, {input}, { token}) => {
      const usecase=new CreateAccountResultUseCase(TypeRepo)
      const {masses, count, totalPages}= await usecase.execute(input)
      return {masses, count, totalPages}
    
    },

    
  
  };
  