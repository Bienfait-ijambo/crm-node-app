import { IUserRepo } from "../../repository/IUserRepo";
import { IPageActionInput } from "./interfaces/userInterfaces";

export class AttribUserPermission {
  constructor(private repo: IUserRepo) {
    this.repo = repo;
  }

  async execute(userId:number,input: IPageActionInput[]) {
    

    if(Array.isArray(input)) {
      await this.repo.attribUserPermission(userId,input);
      return { message: "Permission attribuer avec succès" };
    }else{
      throw new Error("Permission invalid");
    }

    
  }
}
