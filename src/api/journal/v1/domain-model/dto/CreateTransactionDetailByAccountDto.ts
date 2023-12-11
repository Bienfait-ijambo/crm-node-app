import { IsNumber } from "../../../../../shared/dto-validator-class/src/decorators";
import { Required } from "../../../../../shared/dto-validator-class/src/decorators/Required";
import { ValidateClassProperty } from "../../../../../shared/dto-validator-class/src/validators/ValidateClassProperty";
import { ITransactionDetailInput } from "../usecases/interfaces/journalInterfaces";

export class CreateTransactionDetailByAccountDto {


  @Required({
    message: "Veuillez selectionner la date date1 et date2",
  })
  startDate: string;

  @Required({
    message: "Veuillez selectionner la date date1 et date2",
  })
  endDate: string;

  @IsNumber({
    message: "Veuillez selectionner un compte",
  })
  accountId: number;

  @IsNumber({
    message: "UserId must be a number",
  })
  userId: number;

  constructor(input: ITransactionDetailInput) {
    this.userId = input.userId;
    this.startDate = input.startDate;
    this.endDate = input.endDate;
    this.accountId = input.accountId;
  }

  getInput() {
    return {
      userId: this.userId,
      startDate: this.startDate,
      endDate: this.endDate,
      accountId: this.accountId,
      page:undefined
    };
  }

  validate() {
    const validator = new ValidateClassProperty(this);
    const input = validator.verify(validator.validate());
    return Promise.resolve(input).catch((error) => error);
  }
}
