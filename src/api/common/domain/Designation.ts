import { Required } from "../customer-decorators/Required";

export class Designation {
  

    @Required(5,60)
    private designation: string;

      constructor(designation: string) {
        this.designation = designation;
      }
 
      public getDesignation(): string {
        return this.designation;
      }

    }
    