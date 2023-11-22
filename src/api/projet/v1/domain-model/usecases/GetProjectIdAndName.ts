

import { IProjectRepo } from "../../repository/IProjectRepo";
import { IGetProjectIdAndNameInput } from "./interfaces/projectInterfaces";


export class GetProjectIdAndNameUseCase {
  
    constructor(private repo:IProjectRepo){
      this.repo = repo;
    }
    public  async execute(input:IGetProjectIdAndNameInput) {
    
      const result = await this.repo.getProjetNameAndId(input);
      return result
  
    }
  }
  