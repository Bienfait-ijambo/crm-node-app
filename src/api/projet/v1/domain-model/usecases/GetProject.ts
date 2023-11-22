import { IProjectRepo } from "../../repository/IProjectRepo";


export class GetProjectUserCase {
  
  constructor(private repo:IProjectRepo){
    this.repo = repo;
  }
    async execute(name:string,userId,page:number) {
  
    const result = await this.repo.getProjects(name,userId,page);
    return result

  }
}
