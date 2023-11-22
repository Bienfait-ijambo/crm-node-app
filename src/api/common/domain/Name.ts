import { Required } from "../customer-decorators/Required";

export class Name {
  

    @Required(4,30)
    private name: string;

      constructor(name: string) {
        this.name = name;
      }
 
      public getName(): string {
        return this.name;
      }

    }
    