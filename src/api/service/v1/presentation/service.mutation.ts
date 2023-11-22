

import { CreateServiceUseCase } from "../domain-model/usecases/CreateService";
import { UpdateServeUseCase } from "../domain-model/usecases/UpdateService";
import { serviceRepo } from "../repository/TypeormServiceRepo";


export class ServiceMutations{


  async createService (root, {input}, { token}) {
    // verifyToken(token)

    const usecase = new CreateServiceUseCase(serviceRepo);
    return await usecase.execute(input);
 
  }
  async updateService (root, {input}, { token}) {
    // verifyToken(token)
    const usecase = new UpdateServeUseCase(serviceRepo);
    return await usecase.execute(input);
 
  }
}