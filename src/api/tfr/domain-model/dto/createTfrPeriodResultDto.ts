import { PeriodicTfrResult } from "../../../../entities/PeriodicTfrResult";
import {
  IsNumber,
  Required,
} from "../../../../shared/dto-validator-class/src/decorators";
import { ValidateClassProperty } from "../../../../shared/dto-validator-class/src/validators/ValidateClassProperty";
import {
  createPeriodicResultInput,
} from "../usecases/interfaces/tfr.interfaces";

export class CreateTfrPeriodResultDto {
  @Required({
    message: "veuillez entre le nom du résultat",
    Length: {
      min: 3,
      max: 50,
    },
  })
  name: string;

  @IsNumber({
    message: "Le statut doit être en chiffre",
  })
  status: number;

  @Required({
    message: "veuillez entre la date",
    Length: {
      min: 5,
      max: 15,
    },
  })
  resultDate: string;

  @IsNumber({
    message: "UserId must be a number",
  })
  userId: number;

  constructor(input: createPeriodicResultInput) {
    this.userId = input.userId;
    this.name = input.name;
    this.status=input.status
    this.resultDate = input.resultDate;
  }

  getInput() {
    return new PeriodicTfrResult(this.name, this.resultDate,this.status,this.userId);
  }

  validate() {
    const validator = new ValidateClassProperty(this);
    const input = validator.verify(validator.validate());
    return Promise.resolve(input).catch((error) => error);
  }
}
