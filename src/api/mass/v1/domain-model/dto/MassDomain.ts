import { Mass } from "../../../../../entities/Mass";
import { ID } from "../../../../common/domain/ID";
import { ICreateMassInput, IUpdateMassInput } from "../usecases/interfaces/massInterfaces";

import { Name } from "../../../../common/domain/Name";

export class MassDomain {

  public static createMassInput(input: ICreateMassInput) {

    const { name } = this.validateInput(input);

    return new Mass(name, 1);
  }

  private static validateInput(input: ICreateMassInput) {
    const name = new Name(input.name);

    return {
      name: name.getName(),
    };
  }

  public static updateMassInput(input: IUpdateMassInput) {
 
  
    const id = new ID(input.id);

    const { name } = this.validateInput(input);

    return {
      id: id.getId(),
      name: name,
    };
  }


}
