
import { isNumber } from "../../../../common/customer-decorators/Number";
import { Required } from "../../../../common/customer-decorators/Required";
import {  ICreateUpdateAccountInput } from "../usecases/interfaces/accountInterfaces";

export class CreateUpdateAccountInput {


@isNumber
private id: number;

  @Required(4, 100)
  private name: string;

  @isNumber
  private code: string;

  @isNumber
  private typeId: number;

  @isNumber
  private massId: number;


  constructor(input: ICreateUpdateAccountInput) {
    this.typeId = input.typeId;
    this.massId = input.massId;
    this.name = input.name;
    this.id = input.id;
    this.code = input.code;
  }

  public getInput() {

    return {
        id: this.id,
        name: this.name,
        code: this.code,
        typeId: this.typeId,
        massId: this.massId,
      };

  
  
  }
}
