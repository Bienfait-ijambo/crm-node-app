
import { AccountType } from "../../../../../entities/AccountType";
import { ID } from "../../../../common/domain/ID";
import { ICreateTypeInput, IUpdateTypeInput } from "../usecases/interfaces/typeInterfaces";

import { Name } from "../../../../common/domain/Name";

export class TypeDomain {

  public static createTypeInput(input: ICreateTypeInput) {
  

    const { name ,massId} = this.validateInput(input);

    return new AccountType(name, 1);
  }

  private static validateInput(input: ICreateTypeInput) {
    const name = new Name(input.name);
    const massId = new ID(input.massId);
    return {
      name: name.getName(),
      massId: massId.getId(),
    };
  }

  public static updateTypeInput(input: IUpdateTypeInput) {
 

    const id = new ID(input.id);

    const { name ,massId} = this.validateInput(input);

    return {
      id: id.getId(),
      name: name,
      massId: massId,
    };
  }

 
}
