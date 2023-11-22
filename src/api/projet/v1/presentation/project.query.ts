import { ProjectRepo } from "../repository/TypeormProjectRepo";
import { GetProjectUserCase } from "../domain-model/usecases/GetProject";
import { GetProjectIdAndNameUseCase } from "../domain-model/usecases/GetProjectIdAndName";
import { GetProjectAmountUseCase } from "../domain-model/usecases/GetProjectAmount";

export const projectQueries = {
  projects: async (root, {name,userId,page}, { token}) => {
    const usecase = new GetProjectUserCase(ProjectRepo);
    const {projects,count,totalPages}= await usecase.execute(name,userId,page);
    return {projects,count,totalPages}
  },

  projectIdAndName: async (root, {input}, { token}) => {
    const usecase = new GetProjectIdAndNameUseCase(ProjectRepo);
    const {projects}= await usecase.execute(input);
    return projects
 
  },
  getProjectAmount: async (root, {userId,projectId}, { token}) => {

    const usecase = new GetProjectAmountUseCase(ProjectRepo);
    const result= await usecase.execute(projectId,userId);
    return result!=null ?result:{amount:0,paidAmount:0}
    
 
  },

  
};





