import { ITypeRepo } from "../../repository/ITypeRepo";
import { AppDataSource } from "../../../../../infrastructure/typeorm/data-source";
import { TypeDomain } from "../dto/TypeDomain";
import { IUpdateTypeInput } from "./interfaces/typeInterfaces";

export class UpdateTypeUseCase {
  constructor(private repo: ITypeRepo) {
    this.repo = repo;
  }

  async execute(input: IUpdateTypeInput) {
    const type = TypeDomain.updateTypeInput(input);

    return await AppDataSource.manager.transaction(async () => {
      const result = await this.repo.updateType(type);
      await this.repo.updateAccounTypeMass(input.id, input.massId);
      return result;
    });
  }
}
