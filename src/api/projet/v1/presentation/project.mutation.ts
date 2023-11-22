import { ProjectRepo } from "../repository/TypeormProjectRepo";
import { CreateProjectUseCase } from "../domain-model/usecases/CreateProject";
import { UpdateProjectUseCase } from '../domain-model/usecases/UpdateProject';
import { AffectAmountUseCase } from "../domain-model/usecases/AffectAmount";

export const projectMutations = {
  createProject: async (root, {input}, { token}) => {
 
    const usecase = new CreateProjectUseCase(ProjectRepo);
    return await usecase.execute(input);
 
  },
  updateProject: async (root, {input}, { token}) => {
   
    const usecase = new UpdateProjectUseCase(ProjectRepo);
    return await usecase.execute(input);
 
  },

  affectAmountToProject: async (root, {input}, { token}) => {
   
    const usecase = new AffectAmountUseCase(ProjectRepo);
    const result= await usecase.execute(input);
    return result;
 
  },

  
  
};

