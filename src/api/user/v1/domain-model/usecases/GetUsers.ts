
import { IUserRepo } from "../../repository/IUserRepo";
import { SearchUserInput } from "./interfaces/userInterfaces";


export class GetUsersUserCase {
  
  constructor(private repo:IUserRepo){
    this.repo = repo;
  }
  public  async execute(input:SearchUserInput,page:number) {
  
    const result = await this.repo.getUsers(input,page);
    return result

  }
}


// Dependency Injection is a design pattern that allows objects to receive dependencies
//  (i.e., objects or values that they depend on) from outside sources, rather than creating them internally. 