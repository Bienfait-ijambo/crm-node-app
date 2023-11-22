// import { CheckMinAndMaxLength } from "../../common/customer-decorators/checkMinAndMaxLength";
import { Required } from "../customer-decorators/Required";

export class Telephone {
  @Required(10,15)
  private telephone: string;

  constructor(telephone: string) {
    this.telephone = telephone;
  }

  public getTelephone(): string {
    return this.telephone.trim();
  }
}
