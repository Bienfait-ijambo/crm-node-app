import { IProjectRepo } from "../../repository/IProjectRepo";
import { CreateAffectProjectAmountInput } from "../Dto/CreateAffectProjectAmountInput";
import {
  IAffectProjectAmountInput,
} from "./interfaces/projectInterfaces";

export class AffectAmountUseCase {
  constructor(private repo: IProjectRepo) {
    this.repo = repo;
  }
  public async execute(input: IAffectProjectAmountInput) {
    const dto = new CreateAffectProjectAmountInput(input);

    const result = await this.affectAmountToProject(input);
    return result ? { success: true } : { success: false };
  }

  /**
   *
   * @param projectId
   * @param userId
   * get project amount to be paid and paidAmount
   */
  private async affectAmountToProject(input: IAffectProjectAmountInput) {
    const result = await this.repo.getProjectAmount(
      input.projectId,
      input.userId
    );
    //get paidAmount
    const amount = parseFloat(result.amount);
    const amountToAdd = parseFloat(input.amount);

    if (input.status === true) {
      const totalAmount = amount + amountToAdd;
      //update project amount
      const result = await this.repo.affectAmountToProject(
        totalAmount,
        input.projectId
      );
      return result;
    }

    if (input.status === false) {
      if (amount >= amountToAdd) {

        const totalAmount = amount - amountToAdd;
      //update project amount
      const result = await this.repo.affectAmountToProject( totalAmount, input.projectId );
      return result;

      }else{
        throw new Error('Le montant entre est supérieure au cout du projet !')
      }
      
    }
  }
}
