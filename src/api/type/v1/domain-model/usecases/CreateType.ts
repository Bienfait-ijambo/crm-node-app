import { ITypeRepo } from "../../repository/ITypeRepo";
import { TypeDomain } from "../dto/TypeDomain";
import { ICreateTypeInput } from "./interfaces/typeInterfaces";

export class CreateTypeUseCase {
  constructor(private repo: ITypeRepo) {
    this.repo = repo;
  }

  async execute(input: ICreateTypeInput) {
    const type = TypeDomain.createTypeInput(input);

    const doesTypeExist = await this.repo.getTypeByName(input.name);

    if (doesTypeExist == false) {
      const result = await this.repo.createType(type);
      this.repo.createAccounTypeMass(result.id, input.massId);
      return input;
    }

    const typeId = doesTypeExist?.id;

    const accountTypeHasMass = await this.repo.accountTypeHasMass(
      typeId,
      input.massId
    );

    if (accountTypeHasMass)
      throw new Error("Vous avez déjà attribuer ce type à cette masse !");

    this.repo.createAccounTypeMass(typeId, input.massId);

    return input;
  }
}
