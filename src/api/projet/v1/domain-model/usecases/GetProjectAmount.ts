


import { Project } from "../../../../../entities/Project";
import { IProjectRepo } from "../../repository/IProjectRepo";


export class GetProjectAmountUseCase {
  
  constructor(private repo:IProjectRepo){
    this.repo = repo;
  }
  public  async execute(projectId:number,userId:number){
  
    const result = await this.repo.getProjectAmount(projectId,userId);
    return result
    

  }
}


