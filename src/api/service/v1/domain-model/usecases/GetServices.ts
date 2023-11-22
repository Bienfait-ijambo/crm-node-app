import { IServiceRepo } from "../../repository/IServiceRepo";

export class GetServiceUserCase {
  
  constructor(private repo:IServiceRepo){
    this.repo = repo;
  }
  public  async execute(name:string,userId:number,page:number) {
  
    const result = await this.repo.getServices(name,userId,page);
    return result

  }
}


// Dependency Injection is a design pattern that allows objects to receive dependencies
//  (i.e., objects or values that they depend on) from outside sources, rather than creating them internally. 