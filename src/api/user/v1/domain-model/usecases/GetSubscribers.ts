import { IUserRepo } from "../../repository/IUserRepo";
import { userRole } from "../domain/Role";

export class GetSubscribers {
  constructor(private repo: IUserRepo) {
    this.repo = repo;
  }

  async getSubscribers(userCode:string) {

    const user= await this.repo.findUserByCode(userCode)

    if(user){

      if(user.role===userRole.SUPERUSER.trim()){
        const result = await this.repo.getSubscribers();
        return result;
      }
    
    }else{
      throw new Error('No data found !')
    }


  }

  async getSubscribeUsersByCode(userCode: string) {
    const result = await this.repo.getSubscriberUserByCode(userCode);
    return result;
  }
}
