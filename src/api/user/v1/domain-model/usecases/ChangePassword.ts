import { propertyIsValidNumber } from "../../../../common/error/propertyIsValidNumber";
import { IUserRepo } from "../../repository/IUserRepo";
import { UserPassword } from "../domain/UserPassword";
import { UpdatePasswordInput } from "./interfaces/userInterfaces";

export class ChangePasswordUseCase {
  constructor(private repo: IUserRepo) {
    this.repo = repo;
  }

  public async execute(input: UpdatePasswordInput) {
    if (input.newPassword !== input.passwordConfirm)
      throw new Error("Veuillez entre le mot de passe identique !");

    const hashNewPassword = await UserPassword.hashPassword(input.newPassword);
    input.newPassword = hashNewPassword;

    const result = await this.repo.updatePassword(input);

    if (result) return { message: "Mot de passe modifier avec succès !" };
  }
}
