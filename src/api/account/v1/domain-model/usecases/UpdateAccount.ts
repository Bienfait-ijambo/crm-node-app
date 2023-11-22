import { AppDataSource } from "../../../../../infrastructure/typeorm/data-source";
import { IAccountRepo } from "../../repository/IAccountRepo";
import { CreateUpdateAccountInput } from "../dto/CreateUpdateAccountInput";
import { ICreateUpdateAccountInput } from "./interfaces/accountInterfaces";

export class UpdateAccountUseCase {
  constructor(private repo: IAccountRepo) {
    this.repo = repo;
  }

  async execute(input: ICreateUpdateAccountInput) {
    const dto = new CreateUpdateAccountInput(input);

    const result = await AppDataSource.transaction(async () => {
      const updateAccount = await this.repo.updateAccount(dto.getInput());
      return updateAccount;
    });
    return result;
  }
}
