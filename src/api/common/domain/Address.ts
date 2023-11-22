import { Required } from "../customer-decorators/Required";

export class Address {
  

    @Required(5,30)
    private address: string;

      constructor(address: string) {
        this.address = address;
      }
 
      public getAddress(): string {
        return this.address;
      }

    }
    