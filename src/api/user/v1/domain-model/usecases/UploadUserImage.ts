
import { IUserRepo } from "../../repository/IUserRepo";
import { UserDomain } from "../domain/UserDomain";
import { UploadImageInput } from "./interfaces/userInterfaces";

export class UploadUserImage  {

 

  constructor( private repo: IUserRepo) {
    this.repo = repo
  }

  public async execute(input:UploadImageInput){

    const updateInput=UserDomain.uploadUserImageInput(input)
    const result = await this.repo.uploadImage(updateInput)
    return result
  }


}
