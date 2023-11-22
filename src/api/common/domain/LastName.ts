import { Required } from "../customer-decorators/Required";

export class LastName {
  

    @Required(4,20)
    private lastName: string;

      constructor(lastName: string) {
        this.lastName = lastName;
      }
 
      public getLastName(): string {
        return this.lastName;
      }

    }
    