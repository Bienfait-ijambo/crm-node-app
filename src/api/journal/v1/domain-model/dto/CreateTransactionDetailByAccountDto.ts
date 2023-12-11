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

  @Required({
    message: "Veuillez entre le nom du compte !",
  })
  accountName: string;

  @IsNumber({
    message: "Veuillez selectionner un compte",
  })
  accountId: number;

  @Required({
    message: "Veuillez entre le numero du compte en chiffre",
  })
  accountCode: string;

  @IsNumber({
    message: "UserId must be a number",
  })
  userId: number;

  constructor(input: ITransactionDetailInput) {
    this.userId = input.userId;
    this.accountName=input.accountName;
    this.accountCode = input.accountCode;
    this.startDate = input.startDate;
    this.endDate = input.endDate;
    this.accountId = input.accountId;
  }

  getInput() {
    return {
      userId: this.userId,
      accountCode:this.accountCode,
      accountName:this.accountName,
      startDate: this.startDate,
      endDate: this.endDate,
      accountId: this.accountId,
    };
  }

  validate() {
    const validator = new ValidateClassProperty(this);
    const input = validator.verify(validator.validate());
    return Promise.resolve(input).catch((error) => error);
  }
}
