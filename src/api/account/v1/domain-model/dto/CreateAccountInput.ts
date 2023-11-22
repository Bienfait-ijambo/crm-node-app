import { Account, AccountStatus } from "../../../../../entities/Account";
import { isNumber } from "../../../../common/customer-decorators/Number";
import { Required } from "../../../../common/customer-decorators/Required";
import { ICreateAccountInput } from "../usecases/interfaces/accountInterfaces";

export class CreateAccountInput {
  @Required(4, 100)
  private name: string;

  @isNumber
  private code: string;

  @isNumber
  private typeId: number;

  @isNumber
  private massId: number;

  @isNumber
  private userId: number;

  constructor(input: ICreateAccountInput) {
    this.typeId = input.typeId;
    this.massId = input.massId;
    this.userId = input.userId;
    this.name = input.name;
    this.code = input.code;
  }

  public getInput() {

    return new Account(this.name, this.code, this.massId, this.typeId, AccountStatus.ACTIVE,this.userId);
  
  }
}
