import { isNumber } from "../customer-decorators/Number";

export class Amount {
  

    @isNumber
    private amount: string;

      constructor(amount: string) {
        this.amount = amount;
      }
 
      public getamount(): string {
        return this.amount;
      }

    }
    