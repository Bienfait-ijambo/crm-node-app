import { Required } from "../customer-decorators/Required";

export class FirstName {
  

    @Required(4,20)
    private firstName: string;

      constructor(firstName: string) {
        this.firstName = firstName;
      }
 
      public getFirstName(): string {
        return this.firstName;
      }

    }
    