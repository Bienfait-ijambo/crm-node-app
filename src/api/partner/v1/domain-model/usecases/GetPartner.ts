import { IPartnerRepo } from "../../repository/IPartnerRepo";


export class GetPartnerUserCase {
  
  constructor(private repo:IPartnerRepo){
    this.repo = repo;
  }
  public  async execute(name:string,userId,page:number) {
  
    const result = await this.repo.getPartners(name,userId,page);
    return result

  }
}


// Dependency Injection is a design pattern that allows objects to receive dependencies
//  (i.e., objects or values that they depend on) from outside sources, rather than creating them internally. 