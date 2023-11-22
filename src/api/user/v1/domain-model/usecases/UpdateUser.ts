
import { IUserRepo } from "../../repository/IUserRepo";
import { UserDomain } from "../domain/UserDomain";
import { UpdateUserInput } from "./interfaces/userInterfaces";

export class UpdateUserUseCase  {


  constructor( private repo: IUserRepo) {
    this.repo = repo
  }

  public async execute(input:UpdateUserInput){

    const updateInput=UserDomain.updateUserInput(input)
    const result = await this.repo.updateUser(updateInput)
    return result
  }


}
