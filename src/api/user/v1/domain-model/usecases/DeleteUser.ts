import { IUserRepo } from "../../repository/IUserRepo";
import { userRole } from "../domain/Role";
import { IUserDeleteInput } from "./interfaces/userInterfaces";

export class DeleteUserUseCase {
  constructor(private repo: IUserRepo) {
    this.repo = repo;
  }

  async execute(input:IUserDeleteInput) {
    
    const user = await this.repo.findUserByIdAndCode(input.userId, input.userCode);

    if (!user) throw new Error("Error !");

    if (user.role !== userRole.OWNER) {
      const userDeleted = this.repo.deleteUser(input.userId);
      return userDeleted ? true : false;
    }
  }
}
